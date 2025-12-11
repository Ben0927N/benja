import { cargarPagina } from '../Routers/enlaces.js';
import { obtenerTodosLosProveedores } from '../services/proveedoresService.js';
import { guardarNuevoPedidoAPI } from '../services/economatoServices.js'; 

function cargarProveedores(proveedores) {
    // 🌟 CORRECCIÓN DEL ID: usamos 'proveedorPedido' para que coincida con HacerPedido.html
    const selectProveedor = document.getElementById('proveedorPedido'); 

    if (!selectProveedor) {
        console.error("Elemento 'proveedorPedido' no encontrado en HacerPedido.html.");
        return;
    }
    
    selectProveedor.innerHTML = '<option value="">-- Seleccionar Proveedor --</option>';

    proveedores.forEach(proveedor => {
        const option = document.createElement('option');
        option.value = proveedor.id; 
        option.textContent = proveedor.nombre;
        selectProveedor.appendChild(option);
    });
}

// 🌟 FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO
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


async function inicializarHacerPedido() {
    // 1. Cargar proveedores de forma asíncrona
    try {
        const listaProveedores = await obtenerTodosLosProveedores();
        cargarProveedores(listaProveedores);
    } catch (error) {
        console.error("Error al inicializar la lista de proveedores:", error);
    }
    
    // 2. Lógica de botones (se mantiene)
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

    // 3. 🌟 ADICIÓN: Añadir el listener de envío al formulario
    const form = document.getElementById('formNuevoPedido');
    if (form) {
        form.addEventListener('submit', onSubmitPedido); 
    }
}

inicializarHacerPedido();