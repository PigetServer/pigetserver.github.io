import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUIz_zrq0zW8xd8-SogsNn1RbgODj0P3c",
  authDomain: "piget-f160e.firebaseapp.com",
  projectId: "piget-f160e",
  appId: "1:106356200385:web:6e4f808dbe3381f3de9540",
  messagingSenderId: "106356200385"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login handler
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;
    const email = `${username}@piget.user`;

    document.getElementById("login-btn").disabled = true;
    document.getElementById("login-loading").style.display = "block";

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("username", username);
      window.location.href = "dashboard.html";
    } catch (err) {
      alert("Login failed: " + err.message);
    } finally {
      document.getElementById("login-btn").disabled = false;
      document.getElementById("login-loading").style.display = "none";
    }
  });
}

// Register handler
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value;
    const tosChecked = document.getElementById("tos-check").checked;
    const email = `${username}@piget.user`;

    if (!tosChecked) return alert("You must agree to the Terms of Service.");

    document.getElementById("register-btn").disabled = true;
    document.getElementById("register-loading").style.display = "block";

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("username", username);
      window.location.href = "dashboard.html";
    } catch (err) {
      alert("Registration failed: " + err.message);
    } finally {
      document.getElementById("register-btn").disabled = false;
      document.getElementById("register-loading").style.display = "none";
    }
  });
}
