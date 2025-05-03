// Firebase auth
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    const userDisplay = document.getElementById("userDisplay");
    if (userDisplay) {
      userDisplay.innerText = `Logged in as: ${user.uid}`;
    }
  }
});

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}

// Set background color
function setBackground(color) {
  document.body.style.backgroundColor = color;
  localStorage.setItem("backgroundColor", color);
}

// Load background color on page load
window.onload = function () {
  const savedColor = localStorage.getItem("backgroundColor");
  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
  }
};
