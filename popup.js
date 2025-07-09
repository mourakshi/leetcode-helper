// popup.js

document.addEventListener('DOMContentLoaded', async () => {
    const problemTextarea = document.getElementById('problemText');
    const solveButton = document.getElementById('solveButton');
    const solutionOutput = document.getElementById('solutionOutput');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Get the active tab and send a message to the content script to get the problem text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            // Check if the current tab is a LeetCode problem page
            if (activeTab.url && activeTab.url.startsWith("https://leetcode.com/problems/")) {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    files: ['content.js'] // Ensure content.js is injected
                }, () => {
                    chrome.tabs.sendMessage(activeTab.id, { action: "getProblemText" }, (response) => {
                        if (response && response.problemText) {
                            problemTextarea.value = response.problemText;
                        } else {
                            problemTextarea.value = "Could not retrieve problem text. Make sure you are on a LeetCode problem page.";
                            solveButton.disabled = true; // Disable button if no text
                        }
                    });
                });
            } else {
                problemTextarea.value = "Please navigate to a LeetCode problem page (e.g., https://leetcode.com/problems/two-sum/) to use this extension.";
                solveButton.disabled = true;
            }
        }
    });

    solveButton.addEventListener('click', async () => {
        const problemDescription = problemTextarea.value;
        if (!problemDescription || problemDescription.includes("Could not retrieve problem text") || problemDescription.includes("Please navigate to a LeetCode problem page")) {
            solutionOutput.value = "No problem text to solve. Please ensure you are on a LeetCode problem page.";
            return;
        }

        solveButton.disabled = true;
        loadingIndicator.classList.remove('hidden');
        solutionOutput.value = ''; // Clear previous solution

        try {
            // Send the problem description to the background script
            const response = await chrome.runtime.sendMessage({
                action: "solveProblem",
                problem: problemDescription
            });

            if (response && response.solution) {
                solutionOutput.value = response.solution;
            } else if (response && response.error) {
                solutionOutput.value = `Error: ${response.error}`;
            } else {
                solutionOutput.value = "No solution received from AI. Please try again.";
            }
        } catch (error) {
            console.error("Error sending message to background script:", error);
            solutionOutput.value = `An error occurred: ${error.message}`;
        } finally {
            solveButton.disabled = false;
            loadingIndicator.classList.add('hidden');
        }
    });
});
