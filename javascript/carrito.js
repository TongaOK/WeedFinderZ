let geneticasEnCarrito = localStorage.getItem("geneticas-en-carrito");
geneticasEnCarrito = JSON.parse(geneticasEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarGeneticasEnCarrito() {
    if (geneticasEnCarrito && geneticasEnCarrito.length > 0) {



        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        geneticasEnCarrito.forEach(genetica =>{
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${genetica.imagen}" alt="${genetica.nombre}">
            <div class="carrito-producto-titulo">
                <small>Titulo</small>
                <h3>${genetica.nombre}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${genetica.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${genetica.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${genetica.precio * genetica.cantidad}</p>
            </div>
                <button class="carrito-producto-eliminar" id= "${genetica.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div);
        })

} else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
}

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarGeneticasEnCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Te arrepentiste bro",
        duration: 3000,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #008f00, #007400)",
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();
    const idBoton = e.currentTarget.id;
    const index = geneticasEnCarrito.findIndex(genetica => genetica.id === idBoton);

    geneticasEnCarrito.splice(index, 1);
    cargarGeneticasEnCarrito();

    localStorage.setItem("geneticas-en-carrito", JSON.stringify(geneticasEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: 'Seguro?',
        icon: 'question',
        html:
        'Se eliminaran estas geneticas de tu carrito.',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Yea',
        cancelButtonText: 'No...',
    }).then((result) => {
        if (result.isConfirmed) {    
            geneticasEnCarrito.length = 0;
            localStorage.setItem("geneticas-en-carrito", JSON.stringify(geneticasEnCarrito));
            cargarGeneticasEnCarrito();
        }
    })


}

function actualizarTotal() {
    const totalCalculado = geneticasEnCarrito.reduce((acc, genetica) => acc + (genetica.precio * genetica.cantidad), 0)
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    geneticasEnCarrito.length = 0;
    localStorage.setItem("geneticas-en-carrito", JSON.stringify(geneticasEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}



/* JS Scraps
class Compra {
    constructor(carrito) {
        this.carrito = carrito
    }
    obtenerSubtotal() {
        if (this.carrito.length > 0) {
            return this.carrito.reduce((acc, geneticas)=> acc + geneticas.precio, 0)
        } else {
            return 'No tenes nada chabon.'
        }

    }
    confirmarCompra() {
        if (this.obtenerSubtotal() !== 'No tenes nada chabon.') {
            return `Usted esta por pagar $ ${this.obtenerSubtotal()}  \n
            Disfruta tus Geneticas! `
        } else {
            return `Fallo en la compra`
        }
    }
}
*/