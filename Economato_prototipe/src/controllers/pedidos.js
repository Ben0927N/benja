import { cargarPagina } from '../../Routers/enlaces.js';

function inicializarBotonesPedidos() {
    const btnHacer = document.getElementById('btnHacerPedido');
    const btnVer = document.getElementById('btnVerPedidos');

    if (btnHacer) {
        btnHacer.addEventListener('click', () => {
            // El argumento 'hacerPedido' debe coincidir con la ruta en enlaces.js
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