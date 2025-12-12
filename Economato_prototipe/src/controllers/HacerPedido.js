import { cargarPagina } from '../Routers/enlaces.js';
import { obtenerTodosLosProveedores } from '../services/proveedoresService.js';
import { guardarNuevoPedidoAPI } from '../services/economatoServices.js'; 

//Función para cargar la lista de proveedores en el select del formulario
function cargarProveedores(proveedores) {
    const selectProveedor = document.getElementById('proveedorPedido'); 

    if (!selectProveedor) {
        console.error("Elemento 'proveedorPedido' no encontrado en HacerPedido.html.");
        return;
    }
    
    selectProveedor.innerHTML = '<option value="">-- Seleccionar Proveedor --</option>';

    // Rellenar el select con los proveedores obtenidos
    proveedores.forEach(proveedor => {
        const option = document.createElement('option');
        option.value = proveedor.id; 
        option.textContent = proveedor.nombre;
        selectProveedor.appendChild(option);
    });
}

//Función para manejar el envío del formulario de nuevo pedido
async function onSubmitPedido(e) {
    e.preventDefault();

    const form = e.target;
    const fecha = document.getElementById('fechaPedido').value;
    const proveedorId = document.getElementById('proveedorPedido').value;
    const items = document.getElementById('itemsPedido').value.trim();
    
    if (!fecha || !proveedorId || !items) {
        alert("Todos los campos del pedido son obligatorios.");
        return;
    }

    // Crear el objeto del nuevo pedido
    const nuevoPedido = {
        fecha: fecha,
        proveedorId: proveedorId, 
        items: items,
        estado: "Pendiente", 
        timestamp: Date.now() 
    };

    try {
        await guardarNuevoPedidoAPI(nuevoPedido);
        alert("¡Pedido guardado con éxito!");
        form.reset(); 
        cargarPagina('verPedidosTabla'); 
    } catch (error) {
        alert(`Error al guardar el pedido. Detalles: ${error.message}`);
    }
}

//Función principal para inicializar la página de hacer pedido
async function inicializarHacerPedido() {
    // 1. Cargar proveedores de forma asíncrona
    try {
        const listaProveedores = await obtenerTodosLosProveedores();
        cargarProveedores(listaProveedores);
    } catch (error) {
        console.error("Error al inicializar la lista de proveedores:", error);
    }
    
    // 2. Lógica de botones
    const btnVolver = document.getElementById('btnVolverPedidos');
    const btnVerPedidos = document.getElementById('btnIrVerPedidos');

    if (btnVolver) {
        btnVolver.addEventListener('click', (e) => {
            e.preventDefault();
            cargarPagina('pedidos'); 
        });
    }

    if (btnVerPedidos) {
        btnVerPedidos.addEventListener('click', (e) => {
            e.preventDefault();
            cargarPagina('verPedidosTabla'); 
        });
    }

    // 3.Añadir el listener de envío al formulario
    const form = document.getElementById('formNuevoPedido');
    if (form) {
        form.addEventListener('submit', onSubmitPedido); 
    }
}

inicializarHacerPedido();