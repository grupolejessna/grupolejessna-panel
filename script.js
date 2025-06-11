function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "panel.html";
    })
    .catch(error => alert("Error al iniciar sesión: " + error.message));
}

function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      db.collection("usuarios").doc(email).set({ saldo: 0 });
      window.location.href = "panel.html";
    })
    .catch(error => alert("Error al registrarse: " + error.message));
}