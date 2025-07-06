let userId = null;
let username = null;
let currentRoomId = null;

const API = "http://localhost:5000/api";

async function createUser() {
  const inputName = document.getElementById("username").value.trim();
  const res = await fetch(`${API}/users/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: inputName || null,
      isAnonymous: !inputName
    })
  });

  const data = await res.json();
  userId = data.userId;
  username = data.username;
  alert(`Welcome ${username}! Your user ID: ${userId}`);
}

async function joinRoom() {
  if (!userId) return alert("Please create a user first");

  const inputRoomId = document.getElementById("roomId").value.trim();

  if (inputRoomId) {
    currentRoomId = inputRoomId;
    await loadMessages();
  } else {
    // Create a new room
    const res = await fetch(`${API}/rooms/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ createdBy: userId })
    });
    const data = await res.json();
    currentRoomId = data.roomId;
    alert(`Room created: ${currentRoomId}`);
  }

  document.getElementById("chatUI").style.display = "block";
  await loadMessages();
}

async function loadMessages() {
  const res = await fetch(`${API}/rooms/${currentRoomId}/messages`);
  const messages = await res.json();

  const box = document.getElementById("chatBox");
  box.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "msg";
    div.textContent = `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.senderId}: ${msg.text}`;
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
}

async function sendMessage() {
  const text = document.getElementById("message").value.trim();
  if (!text) return;

  await fetch(`${API}/rooms/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      roomId: currentRoomId,
      senderId: userId,
      text: text
    })
  });

  document.getElementById("message").value = "";
  await loadMessages();
}
 