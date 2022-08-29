const abrirCarro = $('#boton-carrito')

const modalContenedor = $('.modal-contenedor')

const cerrarCarro = $('#cerrar-carro')

const modalCarro = $('.modal-carro')

abrirCarro.on('click', () => {
    modalContenedor
        .fadeIn(500)
        .css({
            position: "fixed",
            top: "0",
            width: "100%",
            height: "100vh",
            "background-color": "rgba(0, 0, 0, 0.6)",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            transition: "all .3s",
        })
})

cerrarCarro.on('click', () => {
    modalContenedor.fadeOut(800)
})

modalContenedor.on('click', () => {
    modalContenedor.slideUp(1000)
})

modalCarro.on('click', (event) => {
    event.stopPropagation()
})