import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config
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

// Protect page
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// Logout function
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};
