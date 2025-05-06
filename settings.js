firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const username = user.displayName || user.email.split("@")[0];
  document.getElementById("welcome").innerText = `Welcome, ${username}!`;

  const savedColor = localStorage.getItem("backgroundColor") || "#1e1e1e";
  document.body.style.backgroundColor = savedColor;
});

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}

function setBackgroundColor(color) {
  localStorage.setItem("backgroundColor", color);
  document.body.style.backgroundColor = color;
}
