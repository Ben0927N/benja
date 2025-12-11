import { generarCategorias } from './almacen.js';
import { cargarPagina } from '../../Routers/enlaces.js';
import { getCategorias, getProveedores, agregarProductoAPI } from '../services/economatoServices.js'; 
import { generarProveedores } from '../view/almacen-ui.js';

let listaProveedores = []; 

async function inicializarFormulario() {
    const categoriaSelect = document.getElementById("categoriaSelect");
    const form = document.getElementById("formAgregarProducto");
    const proveedorSelect = document.getElementById('proveedorSelect');
    
    const btnVolver = document.getElementById('btnVolverProductos');

    // 1. Carga de datos y renderizado
    try {
        const [categorias, proveedores] = await Promise.all([
            getCategorias(),
            getProveedores()
        ]);

        listaProveedores = proveedores; // 🌟 Guardar la lista para usarla en el submit

        if (categorias.length) generarCategorias(categorias);

        if (proveedores.length) {
            generarProveedores(proveedores);
        } else {
            console.warn("La API devolvió 0 proveedores. Revisa db.json y economatoServices.js.");
        }

    } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
        alert("Fallo al obtener datos de categorías/proveedores.");
        return;
    }

    // 2. Lógica del Botón Volver (se mantiene)
    if (btnVolver) {
        btnVolver.addEventListener('click', () => cargarPagina('tabla'));
    }

    // 3. 🌟 CORRECCIÓN: Manejar el envío del formulario
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const categoriaValue = categoriaSelect.value.trim();
            const proveedorId = proveedorSelect.value.trim(); // 🌟 Usar el ID del proveedor
            
            // 🌟 OBTENER OBJETO COMPLETO del proveedor usando el ID
            const proveedorSeleccionado = listaProveedores.find(p => p.id === proveedorId); 
            
            if (!categoriaValue || !proveedorId || !proveedorSeleccionado) {
                alert("Debe seleccionar una Categoría y un Proveedor válidos.");
                return;
            }

            const nuevoProducto = {
                // 🌟 CORRECCIÓN: Usar 'stockMinimo' en lugar de 'minimo'
                id: document.getElementById("ID").value.trim() || Date.now().toString(),
                nombre: document.getElementById("nombre").value.trim(),
                categoria: { 
                    nombre: categoriaValue, 
                    // Asumo que la categoría también tiene un ID en db.json, podrías añadirlo si lo necesitas:
                    // id: categorias.find(c => c.nombre === categoriaValue)?.id
                },
                precio: parseFloat(document.getElementById("precio").value),
                stock: parseInt(document.getElementById("stock").value),
                stockMinimo: parseInt(document.getElementById("minimo").value), // 🌟 CORREGIDO el nombre de la propiedad
                proveedor: {
                    // 🌟 Mapeamos el nombre y la isla del proveedor
                    nombre: proveedorSeleccionado.nombre,
                    isla: proveedorSeleccionado.isla || 'N/A' // Asumo que el objeto proveedor tiene una propiedad 'isla'
                }
            };

            try {
                await agregarProductoAPI(nuevoProducto);
                alert("Producto añadido correctamente.");
                form.reset();
                cargarPagina("tabla"); // O a la vista que lista los productos
            } catch (error) {
                alert(`Error al guardar: ${error.message}. Revisar si el JSON Server está activo.`);
                console.error("Fallo al guardar producto:", error);
            }
        });
    }
}

inicializarFormulario();