const API = "http://localhost:5000/api/auth";
let isSignup = true;

function toggleForm() {
  isSignup = !isSignup;
  document.getElementById("formTitle").innerText = isSignup ? "Sign Up" : "Login";
  document.getElementById("toggleLabel").innerText = isSignup ? "Login" : "Sign Up";
  document.getElementById("output").innerText = "";
}

async function submitForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    return (document.getElementById("output").innerText = "Please fill all fields.");
  }

  try {
    const res = await fetch(`${API}/${isSignup ? "signup" : "login"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      return (document.getElementById("output").innerText = data.error || "Something went wrong");
    }

    // ✅ Save token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userId", data.userId);

    // ✅ Redirect to chat
    window.location.href = "rooms.html";
  } catch (err) {
    console.error("Auth error:", err);
    document.getElementById("output").innerText = "Failed to connect.";
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
