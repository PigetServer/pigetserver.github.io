import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const db = getFirestore(app);

const usernameEl = document.getElementById('username');
const tokenCountEl = document.getElementById('tokenCount');
const packsOpenedEl = document.getElementById('packsOpened');
const spinBtn = document.getElementById('spinButton');
const spinResultEl = document.getElementById('spinResult');

let currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const username = user.email.replace('@piget.user', '');
    usernameEl.textContent = username;
    currentUser = user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        tokens: 0,
        packsOpened: 0,
        lastSpin: 0
      });
    }

    const userData = (await getDoc(userRef)).data();
    tokenCountEl.textContent = userData.tokens;
    packsOpenedEl.textContent = userData.packsOpened;
  } else {
    window.location.href = "login.html";
  }
});

spinBtn.addEventListener("click", async () => {
  if (!currentUser) return;

  const userRef = doc(db, "users", currentUser.uid);
  const snap = await getDoc(userRef);
  const data = snap.data();

  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  if (now - data.lastSpin < dayMs) {
    spinResultEl.textContent = "You’ve already spun today. Try again tomorrow!";
    return;
  }

  const reward = Math.floor(Math.random() * 701) + 300;
  await updateDoc(userRef, {
    tokens: data.tokens + reward,
    lastSpin: now
  });

  tokenCountEl.textContent = data.tokens + reward;
  spinResultEl.textContent = `You won ${reward} tokens! 🎉`;
});

document.getElementById("logout").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
