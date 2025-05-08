// Firebase Config (already initialized)
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
const db = firebase.firestore();

const openPackBtn = document.getElementById('openPackBtn');
const logoutBtn = document.getElementById('logoutBtn');
const resultDiv = document.getElementById('result');

const blooks = [
  "Red", "Blue", "Green", "Yellow", "Purple",
  "Orange", "Pink", "Cyan", "Black", "White"
];

auth.onAuthStateChanged(async user => {
  if (!user) return (window.location.href = "login.html");
  const uid = user.uid;
  const userRef = db.collection("users").doc(uid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    await userRef.set({ tokens: 0, inventory: [] });
  }

  openPackBtn.onclick = async () => {
    const data = (await userRef.get()).data();
    let tokens = data.tokens || 0;

    if (tokens < 20) {
      resultDiv.textContent = "Not enough tokens!";
      return;
    }

    const wonBlook = blooks[Math.floor(Math.random() * blooks.length)];
    tokens -= 20;
    const updatedInventory = [...(data.inventory || []), wonBlook];

    await userRef.update({
      tokens,
      inventory: updatedInventory
    });

    resultDiv.textContent = `You opened a Color Pack and got: ${wonBlook}`;
  };

  logoutBtn.onclick = () => {
    auth.signOut().then(() => (window.location.href = "login.html"));
  };
});
