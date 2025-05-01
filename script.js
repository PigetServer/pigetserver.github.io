// script.js

// Save user to localStorage during registration
function registerUser() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const tos = document.getElementById("tos").checked;

  if (!username || !password || !tos) {
    alert("Please fill all fields and agree to the Terms of Service.");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Registration successful! Redirecting to login...");
  window.location.href = "login.html";
}

// Log user in
function loginUser() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser || storedUser.username !== username || storedUser.password !== password) {
    alert("Invalid credentials!");
    return;
  }

  localStorage.setItem("loggedInUser", username);
  window.location.href = "dashboard.html";
}

// Load dashboard data
function loadDashboard() {
  const username = localStorage.getItem("loggedInUser");
  if (!username) {
    window.location.href = "login.html";
    return;
  }
  document.getElementById("username-display").textContent = username;
}
