// content.js

// Listener for messages from the popup/background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProblemText") {
        let problemTitle = "";
        let problemDescription = "";

        // Attempt to find the problem title
        // LeetCode's DOM structure can change, so we try a few common selectors
        const titleElement = document.querySelector('.text-title-large, .text-lg.font-medium, .mr-2.text-xl.font-medium');
        if (titleElement) {
            problemTitle = titleElement.innerText.trim();
        }

        // Attempt to find the problem description.
        // This targets the main content area where the problem statement is.
        // Look for a div that contains the problem description, often with specific data-test-id or class names.
        const descriptionContainer = document.querySelector('.problem-detail__content, ._1l1MA, .px-5.pt-4.pb-2, .description__24sA');
        if (descriptionContainer) {
            problemDescription = descriptionContainer.innerText.trim();
        }

        // Fallback if specific selectors fail or if the structure is different
        if (!problemDescription) {
            // A more general approach: try to get text from the main problem content area
            const mainContentArea = document.querySelector('[data-cy="question-content"]');
            if (mainContentArea) {
                problemDescription = mainContentArea.innerText.trim();
            }
        }

        // Combine title and description
        let fullProblemText = "";
        if (problemTitle) {
            fullProblemText += `Problem Title: ${problemTitle}\n\n`;
        }
        if (problemDescription) {
            fullProblemText += problemDescription;
        }

        if (fullProblemText) {
            sendResponse({ problemText: fullProblemText });
        } else {
            sendResponse({ problemText: "Could not find problem text on this page." });
        }
    }
    // Return true to indicate that the response will be sent asynchronously
    return true;
});
