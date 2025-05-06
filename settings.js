// Apply saved background color on page load
window.onload = () => {
  const savedBg = localStorage.getItem('backgroundColor');
  if (savedBg) {
    document.body.style.backgroundColor = savedBg;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    window.location.href = "login.html";
  }
};

function changeBackground(color) {
  document.body.style.backgroundColor = color;
  localStorage.setItem('backgroundColor', color);
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = "login.html";
}
