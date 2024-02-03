const app = {
    productos: [
      { id: 1, nombre: 'MantecoHarry Potter y la piedra filosofal (1997)', precio: 4500.00 },
      { id: 2, nombre: 'El Temor de un Hombre Sabio (2011)', precio: 7000.00 },
      { id: 3, nombre: 'FerEl Arte de la Guerra', precio: 6000.00 }
    ],
    carrito: [],

    iniciar() {
      this.mostrarProductos();
      this.actualizarCarrito();
      document.getElementById('realizarPago').addEventListener('click', () => this.realizarPago());
      document.getElementById('botonAnimado').addEventListener('click', () => this.animarBoton());
      document.getElementById('botonAceptar').addEventListener('click', () => this.mostrarMensaje());
    },
  

    mostrarProductos() {
      const listaProductos = document.getElementById('lista-productos');
      listaProductos.innerHTML = '';
  
      this.productos.forEach(producto => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} 
          <button onclick="app.agregarAlCarrito(${producto.id})">Agregar al carrito</button>`;
        listaProductos.appendChild(listItem);
      });
    },
  

    actualizarCarrito() {
      const listaCarrito = document.getElementById('lista-carrito');
      const totalElement = document.getElementById('total');
      listaCarrito.innerHTML = '';
  
      let total = 0;
  
      this.carrito.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.producto.nombre} - $${(item.producto.precio * item.cantidad).toFixed(2)} 
          <input class="cantidad-input" type="number" min="1" value="${item.cantidad}" 
          onchange="app.actualizarCantidad(${item.producto.id}, this.value)"> 
          <button onclick="app.eliminarDelCarrito(${item.producto.id})">Eliminar</button>`;
        listaCarrito.appendChild(listItem);
  
        total += item.producto.precio * item.cantidad;
      });
  
      totalElement.textContent = total.toFixed(2);
    },
  

    agregarAlCarrito(id) {
      const productoEncontrado = this.productos.find(producto => producto.id === id);
  
      if (productoEncontrado) {
        const itemExistente = this.carrito.find(item => item.producto.id === id);
  
        if (itemExistente) {
          itemExistente.cantidad++;
        } else {
          this.carrito.push({ producto: productoEncontrado, cantidad: 1 });
        }
  
        this.actualizarCarrito();
      }
    },
  

    eliminarDelCarrito(id) {
      const index = this.carrito.findIndex(item => item.producto.id === id);
  
      if (index !== -1) {
        this.carrito.splice(index, 1);
        this.actualizarCarrito();
      }
    },
  

    actualizarCantidad(id, cantidad) {
      const itemExistente = this.carrito.find(item => item.producto.id === id);
  
      if (itemExistente) {
        itemExistente.cantidad = parseInt(cantidad, 10);
        this.actualizarCarrito();
      }
    },
  

    realizarPago() {
      alert('Simulación de pago realizada con éxito. ¡Gracias por su compra!');
    },
  

    animarBoton() {
        const botonAnimado = document.getElementById('botonAnimado');
        botonAnimado.classList.add('animacion-boton');
        setTimeout(() => {
          botonAnimado.classList.remove('animacion-boton');
          document.getElementById('mensajeBienvenida').style.display = 'block';
        }, 500); 
    },
      
  

    mostrarMensaje() {
      const nombreUsuario = document.getElementById('nombreUsuario').value;
      alert(`¡Bienvenido, ${nombreUsuario}! Gracias por visitar nuestro carrito navideño.`);
    }
};


window.onload = () => {
  app.iniciar();
};
