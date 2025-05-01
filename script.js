// Register
function registerUser() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value;
  const agreed = document.getElementById("terms").checked;

  if (!username || !password || !agreed) {
    alert("Please complete all fields and agree to the terms.");
    return;
  }

  if (localStorage.getItem(`user-${username}`)) {
    alert("Username already exists.");
    return;
  }

  const userData = {
    username,
    password,
    tokens: 0,
    unlocked: 0,
    total: 0,
    packs: 0,
    messages: 0,
  };

  localStorage.setItem(`user-${username}`, JSON.stringify(userData));
  localStorage.setItem("currentUser", username);
  window.location.href = "dashboard.html";
}

// Login
function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  const data = localStorage.getItem(`user-${username}`);
  if (!data) {
    alert("User not found.");
    return;
  }

  const user = JSON.parse(data);
  if (user.password !== password) {
    alert("Incorrect password.");
    return;
  }

  localStorage.setItem("currentUser", username);
  window.location.href = "dashboard.html";
}

// Dashboard load
window.onload = function () {
  if (document.getElementById("username-display")) {
    const username = localStorage.getItem("currentUser");
    if (!username) {
      window.location.href = "login.html";
      return;
    }

    const data = localStorage.getItem(`user-${username}`);
    if (!data) {
      alert("User data corrupted.");
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
      return;
    }

    const user = JSON.parse(data);
    document.getElementById("username-display").innerText = user.username;
    const stats = document.querySelectorAll(".stat strong");
    stats[0].innerText = user.tokens;
    stats[1].innerText = `${user.unlocked} / ${user.total}`;
    stats[2].innerText = user.packs;
    stats[3].innerText = user.messages;
  }
};
