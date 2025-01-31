window.function = async function(api_key, thread_id, run_id, step_id, include) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Validate Thread ID
    if (!thread_id.value) {
        return "Error: Thread ID is required.";
    }

    // Validate Run ID
    if (!run_id.value) {
        return "Error: Run ID is required.";
    }

    // Validate Step ID
    if (!step_id.value) {
        return "Error: Step ID is required.";
    }

    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (include.value) queryParams.append("include[]", include.value);

    // API endpoint URL
    const apiUrl = `https://api.openai.com/v1/threads/${thread_id.value}/runs/${run_id.value}/steps/${step_id.value}?${queryParams.toString()}`;

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key.value}`,
                "OpenAI-Beta": "assistants=v2"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Parse and return response
        const responseData = await response.json();
        return JSON.stringify(responseData, null, 2);

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
