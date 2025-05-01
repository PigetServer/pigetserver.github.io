document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("reg-username").value.trim();
      const password = document.getElementById("reg-password").value.trim();
      const tosChecked = document.getElementById("tos").checked;

      if (!tosChecked) {
        alert("You must agree to the Terms of Service.");
        return;
      }

      if (localStorage.getItem(username)) {
        alert("Username already exists!");
      } else {
        localStorage.setItem(username, password);
        alert("Registered successfully!");
        window.location.href = "login.html";
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();

      const storedPassword = localStorage.getItem(username);
      if (storedPassword && storedPassword === password) {
        alert("Login successful!");
        // Optionally redirect to a dashboard
      } else {
        alert("Invalid username or password.");
      }
    });
  }
});
