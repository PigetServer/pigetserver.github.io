document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("username") || "User";
  document.getElementById("welcome").textContent = `Welcome, ${user}!`;

  const coins = localStorage.getItem("coins") || "0";
  const opened = localStorage.getItem("openedBoxes") || "0";

  document.getElementById("coins").textContent = coins;
  document.getElementById("opened").textContent = opened;
});

function logout() {
  localStorage.removeItem("username");
  window.location.href = "login.html";
}
