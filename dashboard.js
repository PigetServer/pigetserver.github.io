import {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onAuthStateChanged,
  signOut
} from "./dashboard.html"; // Same file as script tag

const usernameSpan = document.getElementById("username");
const tokenCountEl = document.getElementById("token-count");
const spinBtn = document.getElementById("spin-btn");
const spinResult = document.getElementById("spin-result");
const nextSpin = document.getElementById("next-spin");
const logoutBtn = document.getElementById("logoutBtn");

let currentUser = null;
let userDocRef = null;

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUser = user;
  const username = user.email.replace("@piget.user", "");
  usernameSpan.textContent = username;

  userDocRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    await setDoc(userDocRef, {
      tokens: 0,
      lastSpin: 0
    });
    tokenCountEl.textContent = "0";
  } else {
    const data = docSnap.data();
    tokenCountEl.textContent = data.tokens || "0";
    updateSpinCooldown(data.lastSpin);
  }
});

function updateSpinCooldown(lastSpin) {
  const now = Date.now();
  const timeLeft = 86400000 - (now - lastSpin);
  if (timeLeft > 0) {
    spinBtn.disabled = true;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    nextSpin.textContent = `Come back in ${hours}h ${mins}m`;
  }
}

spinBtn.addEventListener("click", async () => {
  if (!currentUser || !userDocRef) return;

  const docSnap = await getDoc(userDocRef);
  const data = docSnap.data();
  const lastSpin = data.lastSpin || 0;

  const now = Date.now();
  if (now - lastSpin < 86400000) {
    spinResult.textContent = "You already claimed your daily spin!";
    return;
  }

  const reward = Math.floor(Math.random() * 701) + 300;
  const newTokens = (data.tokens || 0) + reward;

  await updateDoc(userDocRef, {
    tokens: newTokens,
    lastSpin: now
  });

  tokenCountEl.textContent = newTokens;
  spinResult.textContent = `You won ${reward} tokens! 🎉`;
  spinBtn.disabled = true;
  updateSpinCooldown(now);
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
