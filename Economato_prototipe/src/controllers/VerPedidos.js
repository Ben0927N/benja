import { cargarPagina } from '../../Routers/enlaces.js';

// 🌟 Función de prueba: Simula la obtención de pedidos
function obtenerPedidosSimulados() {
    // Esto debería venir de una API real de pedidos (JSON Server, si la configuras)
    return [
        { id: 'PED001', fecha: '2025-12-10', proveedor: 'Frutas Frescas SL', items: 'Plátano: 50kg, Tomate: 30kg', estado: 'Pendiente' },
        { id: 'PED002', fecha: '2025-12-05', proveedor: 'Quesería Monte Arena', items: 'Queso Majorero: 10un', estado: 'Entregado' },
        { id: 'PED003', fecha: '2025-11-28', proveedor: 'Distribuciones Alimentarias Mediterráneo', items: 'Pasta: 100kg, Leche: 50L', estado: 'Cancelado' },
    ];
}

function renderizarPedidos(pedidos) {
    const tablaBody = document.getElementById('pedidosListadoBody');
    const resumen = document.getElementById('resumenPedidos');

    if (!tablaBody || !resumen) {
        console.error("Elementos de la tabla de pedidos no encontrados.");
        return;
    }

    tablaBody.innerHTML = '';

    if (pedidos.length === 0) {
        tablaBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No se encontraron pedidos.</td></tr>';
        resumen.textContent = 'Total de pedidos: 0';
        return;
    }

    pedidos.forEach(p => {
        const fila = document.createElement('tr');
        // Opcional: añadir clase para resaltar el estado
        if (p.estado === 'Pendiente') fila.classList.add('alerta-pendiente'); 
        if (p.estado === 'Entregado') fila.classList.add('alerta-entregado'); 
        
        fila.innerHTML = `
            <td>${p.id}</td>
            <td>${p.fecha}</td>
            <td>${p.proveedor}</td>
            <td>${p.items}</td>
            <td>${p.estado}</td>
        `;
        tablaBody.appendChild(fila);
    });

    resumen.textContent = `Total de pedidos mostrados: ${pedidos.length}`;
}

function inicializarVerPedidos() {
    // 1. Cargar y renderizar los datos
    const pedidos = obtenerPedidosSimulados(); // Usamos los datos simulados
    renderizarPedidos(pedidos);

    // 2. Enlazar los botones de navegación
    const btnVolver = document.getElementById('btnVolverPedidos');
    const btnHacer = document.getElementById('btnIrHacerPedido');
    
    // Volver a la página de botones de Pedidos
    if (btnVolver) {
        btnVolver.addEventListener('click', (e) => {
            e.preventDefault();
            // Ruta configurada en enlaces.js
            cargarPagina('pedidos'); 
        });
    }

    // Ir a la página de Hacer Pedidos
    if (btnHacer) {
        btnHacer.addEventListener('click', (e) => {
            e.preventDefault();
            // Ruta configurada en enlaces.js
            cargarPagina('hacerPedido'); 
        });
    }
}

inicializarVerPedidos();