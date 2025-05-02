function applyTheme() {
  const theme = localStorage.getItem('theme') || 'default';
  document.body.classList.add(`theme-${theme}`);
}

function register(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const fakeEmail = `${username}@piget.com`;

  firebase.auth().createUserWithEmailAndPassword(fakeEmail, password)
    .then((userCredential) => {
      localStorage.setItem('loggedInUser', userCredential.user.uid);
      localStorage.setItem('username', username);
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}

function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const fakeEmail = `${username}@piget.com`;

  firebase.auth().signInWithEmailAndPassword(fakeEmail, password)
    .then((userCredential) => {
      localStorage.setItem('loggedInUser', userCredential.user.uid);
      localStorage.setItem('username', username);
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      alert(error.message);
    });
}
