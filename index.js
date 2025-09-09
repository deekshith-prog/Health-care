async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();

  if (userMessage === "") return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "chat-message user";
  userDiv.textContent = userMessage;
  chatBox.appendChild(userDiv);

  // Call AI API
  const botReply = await getAIResponse(userMessage);

  // Show bot reply
  const botDiv = document.createElement("div");
  botDiv.className = "chat-message bot";
  botDiv.innerHTML = botReply;
  chatBox.appendChild(botDiv);

  // Auto scroll
  chatBox.scrollTop = chatBox.scrollHeight;

  // Clear input
  input.value = "";
}

// Allow Enter key (prevent double messages)
document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // stop default "submit" behavior
    sendMessage();
  }
});