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

        listaProveedores = proveedores;

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

    // 2. Lógica del Botón Volver
    if (btnVolver) {
        btnVolver.addEventListener('click', () => cargarPagina('tabla'));
    }

    // 3. Manejar el envío del formulario
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const categoriaValue = categoriaSelect.value.trim();
            const proveedorId = proveedorSelect.value.trim();
            
            // Obtener objeto completo del proveedor usando el ID
            const proveedorSeleccionado = listaProveedores.find(p => p.id === proveedorId); 
            
            if (!categoriaValue || !proveedorId || !proveedorSeleccionado) {
                alert("Debe seleccionar una Categoría y un Proveedor válidos.");
                return;
            }

            // Construir el objeto del nuevo producto
            const nuevoProducto = {
                id: document.getElementById("ID").value.trim() || Date.now().toString(),
                nombre: document.getElementById("nombre").value.trim(),
                categoria: { 
                    nombre: categoriaValue, 
                },
                precio: parseFloat(document.getElementById("precio").value),
                stock: parseInt(document.getElementById("stock").value),
                stockMinimo: parseInt(document.getElementById("minimo").value),
                proveedor: {
                    nombre: proveedorSeleccionado.nombre,
                    isla: proveedorSeleccionado.isla || 'N/A' 
                }
            };

            // Validaciones básicas
            try {
                await agregarProductoAPI(nuevoProducto);
                alert("Producto añadido correctamente.");
                form.reset();
                cargarPagina("tabla"); 
            } catch (error) {
                alert(`Error al guardar: ${error.message}. Revisar si el JSON Server está activo.`);
                console.error("Fallo al guardar producto:", error);
            }
        });
    }
}

inicializarFormulario();