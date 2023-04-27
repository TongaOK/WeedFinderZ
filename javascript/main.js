

const geneticas = [
    {
        id: "nlf",
        nombre: "Northern Lights Feminizada",
        imagen: "./img/northern-lights-fem.jpg",
        categoria: {
            titulo: "Feminizadas",
            id: "feminizadas"
        },
        precio: "10000",
    },
    {
        id: "mdf",
        nombre: "Moby Dick Feminizada",
        imagen: "./img/moby-dick-fem.jpg",
        categoria: {
            titulo: "Feminizadas",
            id: "feminizadas"
        },
        precio: 10000,
    },
    {
        id: "gga",
        nombre: "Gorilla Glue Auto",
        imagen: "./img/gorilla-glue-auto.jpg",
        categoria: {
            titulo: "Autos",
            id: "autos"
        },
        precio: 14000,
    },
    {
        id: "lhf",
        nombre: "Lemon Haze Feminizada",
        imagen: "./img/lemon-haze-fem.jpg",
        categoria: {
            titulo: "Feminizadas",
            id: "feminizadas"
        },
        precio: 8000,
    },
    {
        id: "mpf",
        nombre: "Mandarin Punch Feminizada",
        imagen: "./img/mandarin-punch-fem.png",
        categoria: {
            titulo: "Feminizadas",
            id: "feminizadas"
        },
        precio: 12000,
    },
    {
        id: "cca",
        nombre: "Choco Cookies Auto",
        imagen: "./img/choco-cookies-auto.png",
        categoria: {
            titulo: "Autos",
            id: "autos"
        },
        precio: 6000,
    },
]

const contenedorGeneticas = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

function cargarGeneticas(geneticasElegidas) {

    contenedorGeneticas.innerHTML = "";

    geneticasElegidas.forEach(genetica => {


        const div = document.createElement("div");
        div.classList.add("genetica");
        div.innerHTML = `
            <img class="producto-imagen" src="${genetica.imagen}" alt="${genetica.nombre}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${genetica.nombre}</h3>
                <p class="producto-precio">$${genetica.precio}</p>
                <button class="producto-agregar" id="${genetica.id}">Agregar</button>
            </div>
        `;

        contenedorGeneticas.append(div);
    })

    actualizarBotonesAgregar();
}

cargarGeneticas(geneticas);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const geneticaCategoria = geneticas.find(genetica => genetica.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = geneticaCategoria.categoria.titulo;
            const geneticasBoton = geneticas.filter(genetica => genetica.categoria.id === e.currentTarget.id);
            cargarGeneticas(geneticasBoton);
        } else {
            tituloPrincipal.innerText = "Toda la WEED";
            cargarGeneticas(geneticas);
        }

    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let geneticasEnCarrito;

let geneticasEnCarritoLS = localStorage.getItem("geneticas-en-carrito");


if (geneticasEnCarritoLS) {
    geneticasEnCarrito = JSON.parse(geneticasEnCarritoLS);
    actualizarNumero()
} else {
    geneticasEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const geneticaAgregada = geneticas.find(genetica => genetica.id === idBoton);

    if(geneticasEnCarrito.some(genetica => genetica.id === idBoton)) {
        const index = geneticasEnCarrito.findIndex(genetica => genetica.id === idBoton);
        geneticasEnCarrito[index].cantidad++;
    } else {
        geneticaAgregada.cantidad = 1;
        geneticasEnCarrito.push(geneticaAgregada);
    }

    actualizarNumero()

    localStorage.setItem("geneticas-en-carrito", JSON.stringify(geneticasEnCarrito));
}

function actualizarNumero() {
    let nuevoNumero = geneticasEnCarrito.reduce((acc, genetica) => acc + genetica.cantidad, 0);
    numero.innerText = nuevoNumero;
}



/* JS Scraps
const carrito = []

const mensajeInicial = "Escoge tu genetica por su codigo numerico"

function buscarGenetica(codigo) {
    let resultado = geneticas.find((genetica)=> genetica.codigo === parseInt(codigo))
    return resultado
}

function verCarrito() {
    console.table(carrito)
}

function finalizarCompra() {
    if (carrito.length > 0) {
        const shopping = new Compra(carrito)
        alert(`El valor de tu carrito es de $ ${shopping.obtenerSubtotal()}`)
        let respuesta = confirm("Deseas llevar a cabo la compra?")
        if (respuesta) {
            alert(shopping.confirmarCompra())
            carrito.lenght = 0
        }
    } else {
        console.warn("No estas llevando nada bro...")
    }
}

async function comprarGeneticas() {
    try {
    let codigo;
    do {
        codigo = prompt(mensajeInicial);
        if (!parseInt(codigo)) {
        alert("Código inexistente.");
        }
    } while (!parseInt(codigo));
    
    const geneticaElegida = buscarGenetica(codigo);
    if (geneticaElegida) {
        alert(`${geneticaElegida.nombre} ha sido agregada a tu carrito!`);
        carrito.push(geneticaElegida);
        let respuesta = await confirmarAsync("¿Algo más genio?");
        if (respuesta) {
        await comprarGeneticas();
        } else {
            finalizarCompra();
        }
    } else {
        alert("Código inexistente.");
        let respuesta = await confirmarAsync("¿Sale otro try?");
        if (respuesta) {
        await comprarGeneticas();
        }
    }
} 

    catch (error) {
    console.error(error);
    }
}

async function confirmarAsync(mensaje) {
    return new Promise((resolver) => {
    resolver(confirm(mensaje));
    });
}
*/
