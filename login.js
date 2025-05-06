// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUIz_zrq0zW8xd8-SogsNn1RbgODj0P3c",
  authDomain: "piget-f160e.firebaseapp.com",
  projectId: "piget-f160e",
  storageBucket: "piget-f160e.appspot.com",
  messagingSenderId: "106356200385",
  appId: "1:106356200385:web:6e4f808dbe3381f3de9540"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login logic
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const spinner = document.getElementById("spinner");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  loginBtn.disabled = true;
  spinner.style.display = "block";

  const fakeEmail = `${username}@piget.local`;

  signInWithEmailAndPassword(auth, fakeEmail, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
      loginBtn.disabled = false;
      spinner.style.display = "none";
    });
});
