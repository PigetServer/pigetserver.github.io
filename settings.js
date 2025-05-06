const firebaseConfig = {
  apiKey: "AIzaSyDUIz_zrq0zW8xd8-SogsNn1RbgODj0P3c",
  authDomain: "piget-f160e.firebaseapp.com",
  projectId: "piget-f160e",
  storageBucket: "piget-f160e.appspot.com",
  messagingSenderId: "106356200385",
  appId: "1:106356200385:web:6e4f808dbe3381f3de9540"
};

firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const username = user.displayName || user.email.split("@")[0];
    document.getElementById("welcome").innerText = `Welcome, ${username}!`;

    const savedColor = localStorage.getItem("backgroundColor") || "#1e1e1e";
    document.body.style.backgroundColor = savedColor;

    document.querySelectorAll(".bg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const color = btn.getAttribute("data-color");
        document.body.style.backgroundColor = color;
        localStorage.setItem("backgroundColor", color);
      });
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
      }).catch((error) => {
        console.error("Logout error:", error);
      });
    });
  });
});
