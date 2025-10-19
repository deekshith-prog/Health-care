// ---------------- Send User Message ----------------
async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "chat-message user";
  userDiv.textContent = userMessage;
  chatBox.appendChild(userDiv);

  // Clear input
  input.value = "";
  input.focus();

  // WhatsApp-style typing animation
  const typingDiv = document.createElement("div");
  typingDiv.className = "chat-message bot";
  typingDiv.innerHTML = `
    <div class="typing">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate AI response
  const botReply = await getAIResponse(userMessage);

  // Remove typing animation
  typingDiv.remove();

  // Show bot reply
  const botDiv = document.createElement("div");
  botDiv.className = "chat-message bot";
  botDiv.innerHTML = botReply.replace(/\n/g, "<br>");
  chatBox.appendChild(botDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ---------------- Emergency: Precautions + Maps ----------------
function openHospitals() {
  const chatBox = document.getElementById("chat-box");

  const botDiv = document.createElement("div");
  botDiv.className = "chat-message bot";
  botDiv.innerHTML = `
    🚨 <b>Emergency Help</b><br><br>
    ✅ Stay calm.<br>
    ✅ Call emergency services if needed.<br>
    ✅ Keep the patient stable.<br><br>
    📍 <a href="https://www.google.com/maps/search/hospitals+near+me/" target="_blank" style="color:#4facfe">Find Nearby Hospitals</a>
  `;
  chatBox.appendChild(botDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ---------------- Mic Button (Speech Recognition) ----------------
document.getElementById("mic-btn").addEventListener("click", () => {
  const chatBox = document.getElementById("chat-box");

  const listeningDiv = document.createElement("div");
  listeningDiv.className = "chat-message bot";
  listeningDiv.textContent = "🎤 Listening...";
  chatBox.appendChild(listeningDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById("user-input");
    input.value = transcript;
    listeningDiv.remove();
    sendMessage();
  };

  recognition.onerror = function() {
    listeningDiv.textContent = "⚠ Mic error. Please try again.";
    setTimeout(() => listeningDiv.remove(), 2000);
  };

  recognition.onend = function() {
    if (listeningDiv.parentNode) listeningDiv.remove();
  };
});

// ---------------- Enter Key Support ----------------
document.getElementById("user-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

// ---------------- Send Button ----------------
document.getElementById("send-btn").addEventListener("click", sendMessage);

// ---------------- Image Upload Feature ----------------
document.getElementById("image-input").addEventListener("change", async function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const chatBox = document.getElementById("chat-box");

  // Show user uploaded image
  const userDiv = document.createElement("div");
  userDiv.className = "chat-message user";
  const imgTag = document.createElement("img");
  imgTag.src = URL.createObjectURL(file);
  imgTag.style.maxWidth = "150px";
  imgTag.style.borderRadius = "10px";
  userDiv.appendChild(imgTag);
  chatBox.appendChild(userDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Clear file input
  event.target.value = "";

  // Show bot typing animation
  const typingDiv = document.createElement("div");
  typingDiv.className = "chat-message bot";
  typingDiv.innerHTML = `
    <div class="typing">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate image processing (replace with AI/API call)
  const botReply = await getImageDescription(file);

  // Remove typing animation
  typingDiv.remove();

  // Show bot response
  const botDiv = document.createElement("div");
  botDiv.className = "chat-message bot";
  botDiv.innerHTML = botReply.replace(/\n/g, "<br>");
  chatBox.appendChild(botDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// ---------------- Trigger Hidden File Input via Button ----------------
document.getElementById("image-btn").addEventListener("click", () => {
  document.getElementById("image-input").click();
});

// ---------------- Dummy Function: Image Description ----------------
async function getImageDescription(file) {
  return "📝 This appears to be a medicine or report. Please follow the instructions on the label or consult your doctor.";
print("hello hii")
}


