onAuthStateChanged(auth, user => {
  if (user) {
    const name = user.displayName || "User";
    document.getElementById("userDisplay").textContent = `Logged in as: ${name}`;
    document.getElementById("usernameDisplay").textContent = name;

    // Placeholder values for stats
    document.getElementById("tokensCount").textContent = "100";
    document.getElementById("packsOpenedCount").textContent = "3";

  } else {
    window.location.href = "login.html";
  }
});
