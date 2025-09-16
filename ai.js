const API_KEY = "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"; // put your OpenRouter API key here

async function getAIResponse(userMessage) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    if (!response.ok) {
      throw new Error("AI request failed: " + response.status);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "⚠ Sorry, I couldn’t reach the AI service. Please check your API key or internet.";
  }
}