firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const username = user.displayName || user.email.split("@")[0];
  document.getElementById("welcome").innerText = `Welcome, ${username}!`;

  document.body.style.backgroundColor = localStorage.getItem("backgroundColor") || "#1e1e1e";
});

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}
