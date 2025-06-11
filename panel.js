let carrito = [];
let total = 0;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userRef = db.collection("usuarios").doc(user.email);
    userRef.get().then(doc => {
      document.getElementById("saldo").innerText = "Saldo: $" + doc.data().saldo;
    });
  } else {
    window.location.href = "index.html";
  }
});

function agregar(servicio, precio) {
  carrito.push({ servicio, precio });
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito");
  lista.innerHTML = "";
  total = 0;
  carrito.forEach(item => {
    total += item.precio;
    const li = document.createElement("li");
    li.innerText = item.servicio + " - $" + item.precio;
    lista.appendChild(li);
  });
  document.getElementById("total").innerText = "Total: $" + total;
}

function enviarWhatsApp() {
  const mensaje = encodeURIComponent("Pedido:\n" + carrito.map(i => i.servicio).join(", ") + "\nTotal: $" + total);
  window.open(`https://wa.me/573001234567?text=${mensaje}`, '_blank');
}