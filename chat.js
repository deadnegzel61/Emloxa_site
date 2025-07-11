const friends = ["Ahmet", "Elif", "Mert", "Zeynep"];
let selectedFriend = null;
const messages = {}; // { friendName: [msg1, msg2...] }

const friendListEl = document.getElementById("friend-list");
const chatHeader = document.getElementById("chat-header");
const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

friends.forEach(friend => {
  const li = document.createElement("li");
  li.textContent = friend;
  li.addEventListener("click", () => selectFriend(friend));
  friendListEl.appendChild(li);
});

function selectFriend(friend) {
  selectedFriend = friend;
  chatHeader.textContent = friend;
  renderMessages();
}

function renderMessages() {
  chatMessages.innerHTML = "";
  const msgs = messages[selectedFriend] || [];
  msgs.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = msg;
    chatMessages.appendChild(div);
  });
}

sendBtn.addEventListener("click", () => {
  const text = messageInput.value.trim();
  if (!text || !selectedFriend) return;
  if (!messages[selectedFriend]) messages[selectedFriend] = [];
  messages[selectedFriend].push(text);
  messageInput.value = "";
  renderMessages();
});
