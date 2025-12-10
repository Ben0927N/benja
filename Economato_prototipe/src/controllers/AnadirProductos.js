import { generarCategorias } from './almacen.js';
import { cargarPagina } from '../../Routers/enlaces.js';
import { getCategorias, getProveedores, agregarProductoAPI } from '../services/economatoServices.js';
import { generarProveedores } from '../view/almacen-ui.js';


async function inicializarFormulario() {
    const categoriaSelect = document.getElementById("categoriaSelect");
    const form = document.getElementById("formAgregarProducto");
    const proveedorSelect = document.getElementById('proveedorSelect');
    // Se ha eliminado la referencia a inputIsla.

    const btnVolver = document.getElementById('btnVolverProductos');

    // 1. Carga de datos y renderizado
    try {
        const [categorias, proveedores] = await Promise.all([
            getCategorias(),
            getProveedores()
        ]);

        if (categorias.length) generarCategorias(categorias);

        if (proveedores.length) {
            generarProveedores(proveedores); // Usa la función importada y corregida
        } else {
            console.warn("La API devolvió 0 proveedores. Revisa db.json y economatoServices.js.");
        }

    } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
        alert("Fallo al obtener datos de categorías/proveedores.");
        return;
    }

    // 2. Evento de cambio de Proveedor - ELIMINADO

    // 3. Evento Volver
    if (btnVolver) {
        btnVolver.addEventListener('click', (e) => {
            e.preventDefault();
            // Llama a la función exportada de enlaces.js (que ya está importada con la doble ../)
            cargarPagina("tabla");
        });
    } else {
        console.error("No se encontró el botón 'btnVolverProductos'.");
    }

    // 4. Evento de Envío del Formulario (Guardado en API)
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const selectedProveedorOption = proveedorSelect.options[proveedorSelect.selectedIndex];
            const categoriaValue = categoriaSelect.value.trim();
            const proveedorValue = selectedProveedorOption.value.trim();
            const islaValue = selectedProveedorOption.dataset.isla || '';

            // Se ha eliminado la lógica para calcular islaValue

            if (!categoriaValue || !proveedorValue) {
                alert("Debe seleccionar una Categoría y un Proveedor válidos.");
                return;
            }

            const nuevoProducto = {
                id: document.getElementById("ID").value.trim() || Date.now().toString(),
                nombre: document.getElementById("nombre").value.trim(),
                categoria: { nombre: categoriaValue },
                precio: parseFloat(document.getElementById("precio").value),
                stock: parseInt(document.getElementById("stock").value),
                minimo: parseInt(document.getElementById("minimo").value),
                proveedor: {
                    nombre: proveedorValue,
                    isla: islaValue
                }
            };

            try {
                await agregarProductoAPI(nuevoProducto);
                alert("Producto añadido correctamente");
                cargarPagina("tabla");

            } catch (error) {
                alert(`Error al guardar: ${error.message}. Revisar si el JSON Server está activo.`);
                console.error("Fallo al guardar producto:", error);
            }
        });
    }
}

inicializarFormulario();