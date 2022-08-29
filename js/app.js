$(document).ready(function () {
    $('#one').text("Gracias por elegirnos.");
});

$("body").fadeIn(1500)

let contenedorProductos = $("#contenedor-productos");

mostrarProductos(productos)

function mostrarProductos(productos) {

    contenedorProductos.html('');

    for (const producto of productos) {
        contenedorProductos.append(`
            <div class="card-productos">
                <div>
                    <img class="img-producto" src=${producto.img} alt="producto">
                    <p class="producto-marca">${producto.marca}</p>
                    <p class="producto-descripcion">${producto.desc}</p>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button onclick=agregarAlCarro(${producto.id}) class="boton-comprar">Comprar</button>
                </div>
            </div>
            `
        )
    }
}

const filtroProducto = $("#filtro-producto")

function filtrar(event) {

    const filter = event.target.value;

    if (filter === 'all') {
        mostrarProductos(productos)
    } else {
        const productoFiltrado = productos.filter(el => el.tipo === filter)
        mostrarProductos(productoFiltrado)
    }
}

filtroProducto.on('change', (event) => {
    filtrar(event)
})