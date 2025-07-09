// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "solveProblem") {
        const problem = request.problem;
        console.log("Received problem for AI:", problem);

        // Function to call the Gemini API
        async function callGeminiAPI(problemDescription) {
            let chatHistory = [];
            const prompt = `You are an expert LeetCode problem solver. Provide a detailed and optimized solution for the following LeetCode problem. Include the problem title, a clear explanation of the approach, the Python code implementation, and an analysis of its time and space complexity. Ensure the code is well-commented and follows best practices.

LeetCode Problem:
${problemDescription}

Your Solution:`;

            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };

            // Retrieve API key from chrome.storage.sync
            let apiKey = "";
            try {
                const result = await chrome.storage.sync.get(["geminiApiKey"]);
                if (result.geminiApiKey) {
                    apiKey = result.geminiApiKey;
                } else {
                    // If API key is not found, return an error message
                    return "Error: Gemini API Key not found. Please set it in the extension options.";
                }
            } catch (error) {
                console.error("Error retrieving API key from storage:", error);
                // Return an error if there's an issue with storage access
                return `Error retrieving API key: ${error.message}`;
            }

            // Construct the API URL with the retrieved API key
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                // Check if the API response was successful
                if (!response.ok) {
                    const errorData = await response.json();
                    // Throw an error with detailed API response if not successful
                    throw new Error(`API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
                }

                const result = await response.json();
                console.log("Gemini API response:", result);

                // Check if the response contains valid content
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    return result.candidates[0].content.parts[0].text;
                } else {
                    console.warn("Unexpected API response structure:", result);
                    return "No solution generated. The AI response was empty or malformed.";
                }
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                // Return a user-friendly error message if the API call fails
                return `Failed to get solution from AI: ${error.message}`;
            }
        }

        // Call the Gemini API function and send the response back to the popup script
        callGeminiAPI(problem)
            .then(solution => {
                sendResponse({ solution: solution });
            })
            .catch(error => {
                // Catch any errors from the API call and send them back
                sendResponse({ error: error.message });
            });

        // Return true to indicate that the sendResponse function will be called asynchronously
        return true;
    }
});
