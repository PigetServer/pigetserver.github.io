// Simulate login storage
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    window.location.href = "login.html"; // force login if not logged in
  } else {
    document.getElementById("userTitle").textContent = `Welcome, ${user.username}`;
    document.getElementById("tokenCount").textContent = user.tokens ?? 0;
    document.getElementById("blooksCount").textContent = `${user.blooksUnlocked ?? 0} / 463`;
    document.getElementById("packsCount").textContent = user.packsOpened ?? 0;
    document.getElementById("messagesCount").textContent = user.messagesSent ?? 0;
  }
});
