import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUIz_zrq0zW8xd8-SogsNn1RbgODj0P3c",
  authDomain: "piget-f160e.firebaseapp.com",
  projectId: "piget-f160e",
  messagingSenderId: "106356200385",
  appId: "1:106356200385:web:6e4f808dbe3381f3de9540"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  if (user) {
    const userDisplay = document.getElementById("userDisplay");
    userDisplay.textContent = `Logged in as: ${user.displayName || "User"}`;
  } else {
    window.location.href = "login.html";
  }
});

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};
