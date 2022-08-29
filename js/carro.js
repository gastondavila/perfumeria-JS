let carro = []

let carroLS = JSON.parse(localStorage.getItem('carro'))

if (carroLS) {
    carro = carroLS
    actualizarCarro()
}

/* AGREGAR AL CARRO */

function agregarAlCarro(idProducto) {

    const productoElegido = carro.find(el => el.id === idProducto)
    const {stock} = productos.find(el => el.id === idProducto)

    if (productoElegido) {
        if((productoElegido.cantidad + 1) <= stock) {
            productoElegido.cantidad +=1
        } else {
            alert('Sin stock')
        }
    } else if (stock > 0) {
        const {id, desc, precio} = productos.find(el => el.id === idProducto)
        carro.push({id: id, desc: desc, precio: precio, cantidad: 1})
    } else {
        alert('Stock insuficiente')
    }    

    localStorage.setItem('carro', JSON.stringify(carro))

    actualizarCarro()
}

/* ELIMINAR PRODUCTO */

function eliminarProducto(id) {
    const sacarProducto = carro.find(el => el.id === id)

    sacarProducto.cantidad--

    if(sacarProducto.cantidad === 0) {
        const indice = carro.indexOf(sacarProducto)
        carro.splice(indice, 1)
    }    

    localStorage.setItem('carro', JSON.stringify(carro))
    actualizarCarro()
}

/* ACTUALIZAR CARRO */

function actualizarCarro() {

    const contenedorCarro = document.getElementById('contenedor-carro')
    const precioTotal = document.getElementById('precio-total')
    const precioIva = document.getElementById('precio-iva')
    const precioPagar = document.getElementById('aPagar')
    const contadorCarro = document.getElementById('contador-carro')

    contenedorCarro.innerHTML = ''

    carro.forEach((producto) => {
        contenedorCarro.innerHTML += `
        <div class="producto-carro">
            <p>${producto.desc}</p>
            <p>$${producto.precio * producto.cantidad}</p>
            <p id="cantidad">Cantidad: ${producto.cantidad}</p>
            <button onclick=eliminarProducto(${producto.id}) class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        </div>
        `
    })

    let ingresarPrecioTotal = carro.reduce( (acc, el) => acc + (el.precio * el.cantidad), 0 )
        precioTotal.innerText = ingresarPrecioTotal    
    
    let iva = carro.reduce( (acc, el) => acc + ((el.precio * el.cantidad)* 0.21), 0 )    
    precioIva.innerText = iva.toFixed(2)

    let precioConDecimal = ingresarPrecioTotal + iva 
    precioPagar.innerText = precioConDecimal.toFixed(2)
    localStorage.setItem('precioConDecimal', JSON.stringify(precioConDecimal))

    contadorCarro.innerText = carro.reduce((acc, el) => acc + el.cantidad, 0 )
    localStorage.setItem('contadorCarro', JSON.stringify(carro.length))
}

/* ELIMINAR TODO */

function eliminarTodo() {
    localStorage.clear(carro)
    carro = []
    actualizarCarro()
    modalContenedor.fadeOut(800)
}