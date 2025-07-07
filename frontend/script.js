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

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userId", data.userId);

    document.getElementById("output").innerText = `${isSignup ? "Signed up" : "Logged in"} as ${data.username}`;
    console.log("Token stored:", data.token);
    // Optional: redirect to chat.html or another page
  } catch (err) {
    console.error("Auth error:", err);
    document.getElementById("output").innerText = "Failed to connect.";
  }
}
