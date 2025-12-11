import { cargarPagina } from '../Routers/enlaces.js'; 

function inicializarBotonesPedidos() {
    // 2. Obtén el botón "Hacer Pedido" por su ID
    const btnHacer = document.getElementById('btnHacerPedido');
    
    // (Opcional) El botón "Ver Pedidos"
    const btnVer = document.getElementById('btnVerPedidos');

    // 3. Si el botón existe, añade el evento de click
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