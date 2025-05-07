// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase config (already prefilled)
const firebaseConfig = {
  apiKey: "AIzaSyDUIz_zrq0zW8xd8-SogsNn1RbgODj0P3c",
  authDomain: "piget-f160e.firebaseapp.com",
  projectId: "piget-f160e",
  storageBucket: "piget-f160e.appspot.com",
  messagingSenderId: "106356200385",
  appId: "1:106356200385:web:6e4f808dbe3381f3de9540"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const welcome = document.getElementById("welcome-user");
const tokenCount = document.getElementById("token-count");
const logoutBtn = document.getElementById("logout");

// Auth check and token display
onAuthStateChanged(auth, async user => {
  if (user) {
    const username = user.email.replace("@piget.user", "");
    welcome.textContent = `Welcome, ${username}!`;

    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      tokenCount.textContent = data.tokens || 0;
    } else {
      await setDoc(userDoc, { tokens: 0, packsOpened: 0 });
      tokenCount.textContent = 0;
    }
  } else {
    window.location.href = "login.html";
  }
});

// Logout button
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});
