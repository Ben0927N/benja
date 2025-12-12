import { getproducto } from '../services/economatoServices.js';

const ITEMS_PER_PAGE = 10; 
let currentPage = 1;
let allProducts = []; 

// Función de renderizado de productos 
function renderizarProductos(productos) {
    const tabla = document.getElementById('productosPaginadosBody'); 
    const resumen = document.getElementById('resumenListado');
    
    if (!tabla || !resumen) return;

    tabla.innerHTML = '';
    
    // 1. Calcular qué productos mostrar en la página actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const productosPagina = productos.slice(startIndex, endIndex);

    // 2. Crear las filas de la tabla
    productosPagina.forEach(p => {
        const fila = document.createElement('tr');

        if (p.stock < p.stockMinimo) fila.classList.add('alerta'); 

        // Rellenar la fila con los datos del producto
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


// Función de controles de paginación

function renderizarControlesPaginacion() {
    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
    const pageNumbersDiv = document.getElementById('pageNumbers');

    if (!pageNumbersDiv || totalPages <= 1) {
        if (pageNumbersDiv) pageNumbersDiv.innerHTML = '';
        return;
    }

    pageNumbersDiv.innerHTML = '';

    // Bucle para crear un botón para cada página
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        
        // Marcar el botón de la página actual como activo
        if (i === currentPage) {
            btn.classList.add('active');
        }
        
        // Evento para cambiar de página
        btn.addEventListener('click', () => {
            currentPage = i;
            renderizarProductos(allProducts);
            renderizarControlesPaginacion(); 
            document.getElementById('listadoProductosPaginados')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        pageNumbersDiv.appendChild(btn);
    }
}


// Función de inicialización (Carga de datos y renderizado inicial)
async function inicializarListado() {
    const tabla = document.getElementById('productosPaginadosBody');
    if (!tabla) return;
    
    try {
        tabla.innerHTML = '<tr><td colspan="8" style="text-align:center;">Cargando productos...</td></tr>';
        
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

inicializarListado();