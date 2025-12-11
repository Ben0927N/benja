import { getproducto } from '../services/economatoServices.js';

// --- CONFIGURACIÓN Y ESTADO GLOBAL ---
const ITEMS_PER_PAGE = 10; // Muestra 10 productos por página
let currentPage = 1;
let allProducts = []; // Aquí guardaremos todos los productos del JSON


// --- 1. FUNCIÓN PRINCIPAL DE RENDERIZADO ---

function renderizarProductos(productos) {
    // Apuntamos al <tbody> y al <tfoot> con los nuevos IDs
    const tabla = document.getElementById('productosPaginadosBody'); 
    const resumen = document.getElementById('resumenListado');
    
    // Verificación de seguridad: si no encontramos los elementos, salimos.
    if (!tabla || !resumen) return;

    tabla.innerHTML = '';
    
    // 1. Calcular qué productos mostrar en la página actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // .slice() nos da solo los 10 productos de la página
    const productosPagina = productos.slice(startIndex, endIndex);

    // 2. Crear las filas de la tabla (<tr>)
    productosPagina.forEach(p => {
        const fila = document.createElement('tr');
        // Usamos la clase de alerta existente
        if (p.stock < p.stockMinimo) fila.classList.add('alerta'); 

        // Usamos las protecciones (?., || '') para que no falle con datos incompletos
        fila.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria?.nombre || ''}</td>
            <td>${p.precio ? p.precio.toFixed(2) : '0.00'}</td>
            <td>${p.stock || 0}</td>
            <td>${p.stockMinimo || 0}</td>
            <td>${p.proveedor?.nombre || ''}</td>
            <td>${p.proveedor?.isla || ''}</td>
        `;
        tabla.appendChild(fila);
    });

    // 3. Crear los botones de página
    renderizarControlesPaginacion();

    // 4. Mostrar resumen (simple)
    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
    resumen.textContent = `Página ${currentPage} de ${totalPages} | Total de productos: ${allProducts.length}`;
}


// --- 2. FUNCIÓN DE CONTROLES DE PAGINACIÓN ---

function renderizarControlesPaginacion() {
    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
    const pageNumbersDiv = document.getElementById('pageNumbers');

    if (!pageNumbersDiv || totalPages <= 1) {
        if (pageNumbersDiv) pageNumbersDiv.innerHTML = '';
        return;
    }

    pageNumbersDiv.innerHTML = '';

    // Bucle para crear un botón para CADA página (ej. 1, 2, 3, 4, 5...)
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        
        // Marcar el botón de la página actual como activo
        if (i === currentPage) {
            btn.classList.add('active');
        }
        
        // El evento: al hacer clic, actualiza la página y renderiza de nuevo
        btn.addEventListener('click', () => {
            currentPage = i;
            renderizarProductos(allProducts);
            // Opcional: vuelve a renderizar los controles para actualizar la clase 'active'
            renderizarControlesPaginacion(); 
            // Opcional: scroll al inicio de la tabla
            document.getElementById('listadoProductosPaginados')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        pageNumbersDiv.appendChild(btn);
    }
}


// --- 3. FUNCIÓN DE INICIALIZACIÓN (Carga de Datos) ---

async function inicializarListado() {
    const tabla = document.getElementById('productosPaginadosBody');
    if (!tabla) return;
    
    try {
        // Mensaje de carga inicial
        tabla.innerHTML = '<tr><td colspan="8" style="text-align:center;">Cargando productos...</td></tr>';
        
        // Carga todos los datos
        allProducts = await getproducto(); 
        
        if (allProducts.length === 0) {
            tabla.innerHTML = '<tr><td colspan="8" style="text-align:center;">No se encontraron productos.</td></tr>';
            return;
        }

        currentPage = 1; 
        renderizarProductos(allProducts);
        
    } catch (error) {
        console.error("Error al inicializar el listado paginado:", error);
        tabla.innerHTML = '<tr><td colspan="8" style="color:red; text-align:center;">Fallo al cargar los datos del servidor.</td></tr>';
    }
}

// Inicia el proceso al cargar el script
inicializarListado();