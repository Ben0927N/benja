import { cargarPagina } from '../Routers/enlaces.js';

function inicializarHacerPedido() {
    // 1. Obtener los botones de navegación
    const btnVolver = document.getElementById('btnVolverPedidos');
    const btnVerPedidos = document.getElementById('btnIrVerPedidos');

    // El ID que usamos para la vista de los dos botones cuadrados
    const VISTA_PEDIDOS_MENU = 'pedidos'; 
    // El ID que usarías para la tabla de pedidos
    const VISTA_VER_PEDIDOS = 'verPedidosTabla'; 

    // 2. Asignar evento al botón "Volver"
    if (btnVolver) {
        btnVolver.addEventListener('click', (e) => {
            e.preventDefault();
            // Volver al menú de pedidos (los dos botones cuadrados)
            cargarPagina(VISTA_PEDIDOS_MENU); 
        });
    }

    // 3. Asignar evento al botón "Ver Pedidos"
    if (btnVerPedidos) {
        btnVerPedidos.addEventListener('click', (e) => {
            e.preventDefault();
            // Ir a la vista de la tabla de todos los pedidos
            cargarPagina(VISTA_VER_PEDIDOS); 
        });
    }

    // Nota: Aquí iría la lógica para cargar proveedores en el select,
    // y la lógica para manejar el envío del formulario (btnGuardarPedido).
}

inicializarHacerPedido();