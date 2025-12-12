import { cargarPagina } from '../../Routers/enlaces.js';

// Función para inicializar los botones de pedidos
function inicializarBotonesPedidos() {
    const btnHacer = document.getElementById('btnHacerPedido');
    const btnVer = document.getElementById('btnVerPedidos');

    if (btnHacer) {
        btnHacer.addEventListener('click', () => {
            cargarPagina('hacerPedido'); 
        });
    }

    if (btnVer) {
        btnVer.addEventListener('click', () => {
            cargarPagina('verPedidosTabla'); 
        });
    }
}

inicializarBotonesPedidos();