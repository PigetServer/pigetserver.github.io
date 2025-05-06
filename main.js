// Firebase init
const firebaseConfig = {
  apiKey: "AIzaSyDUIz_zrq0zW8xd8-SogsNn1RbgODj0P3c",
  authDomain: "piget-f160e.firebaseapp.com",
  projectId: "piget-f160e",
  storageBucket: "piget-f160e.appspot.com",
  messagingSenderId: "106356200385",
  appId: "1:106356200385:web:6e4f808dbe3381f3de9540"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (!user) return location.href = "login.html";
  const username = user.email.split('@')[0];
  document.getElementById('welcome-message').textContent = `Welcome, ${username}!`;
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut().then(() => location.href = "login.html");
});

// Show only content relevant to the current page
const page = location.pathname.split("/").pop();
if (page === "dashboard.html") {
  document.getElementById("dashboard-link").classList.add("active");
} else if (page === "settings.html") {
  document.getElementById("settings-link").classList.add("active");
  document.getElementById("settings-content").style.display = "block";
  document.getElementById("dashboard-stats").style.display = "none";
} else if (page === "market.html") {
  document.getElementById("market-link").classList.add("active");
  document.getElementById("market-content").style.display = "block";
  document.getElementById("dashboard-stats").style.display = "none";
}
