import { getproducto } from '../services/economatoServices.js';

// --- CONFIGURACIÓN Y ESTADO GLOBAL ---
const ITEMS_PER_PAGE = 10; 
let currentPage = 1;
let allProducts = []; // Contiene TODOS los productos cargados de la API


// --- 1. FUNCIÓN PRINCIPAL DE RENDERIZADO (Simplificada) ---
// Ahora solo necesita la lista de productos COMPLETA.

function renderizarProductos() { // ❌ Eliminar el argumento 'productos'
    // Apuntamos al <tbody> y al <tfoot> con los nuevos IDs
    const tabla = document.getElementById('productosPaginadosBody'); 
    const resumen = document.getElementById('resumenListado');
    
    if (!tabla || !resumen) return;

    tabla.innerHTML = '';
    
    // 1. Calcular qué productos mostrar en la página actual usando allProducts
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // Usamos el array global
    const productosPagina = allProducts.slice(startIndex, endIndex); 

    // 2. Crear las filas de la tabla (<tr>)
    productosPagina.forEach(p => {
        const fila = document.createElement('tr');
        if (p.stock < p.stockMinimo) fila.classList.add('alerta'); 

        // RENDERIZADO DE FILAS (se mantiene la lógica)
        fila.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria?.nombre || ''}</td>
            <td>${(p.precio !== undefined && p.precio !== null) ? p.precio.toFixed(2) : '0.00'}</td>
            <td>${p.stock}</td>
            <td>${p.stockMinimo}</td>
            <td>${p.proveedor?.nombre || ''}</td>
            <td>${p.proveedor?.isla || ''}</td>
        `;
        tabla.appendChild(fila);
    });

    // 3. Renderizar resumen (se mantiene la lógica)
    const totalProductos = allProducts.length;
    resumen.textContent = `Mostrando ${startIndex + 1} a ${Math.min(endIndex, totalProductos)} de ${totalProductos} productos.`;
    
    // 4. Llama a la función de renderizado de controles después de actualizar la tabla
    renderizarControlesPaginacion();
}


// --- 2. FUNCIÓN DE RENDERIZADO DE CONTROLES (Simplificada y corregida) ---

function renderizarControlesPaginacion() {
    const pageNumbersDiv = document.getElementById('pageNumbers');
    if (!pageNumbersDiv) return;

    pageNumbersDiv.innerHTML = '';
    // Calcular el número total de páginas basado en el array global
    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

    if (totalPages <= 1) return; // No mostrar controles si solo hay una página

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('page-number-btn'); // Clase CSS
        
        // Marcar la página actual
        if (i === currentPage) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            currentPage = i;
            // 🌟 SOLO LLAMAMOS A renderizarProductos, que ya sabe qué datos usar
            renderizarProductos(); 
        });
        
        pageNumbersDiv.appendChild(btn);
    }
}


// --- 3. FUNCIÓN DE INICIALIZACIÓN (Carga de Datos) ---

async function inicializarListado() {
    const tabla = document.getElementById('productosPaginadosBody');
    if (!tabla) return;
    
    try {
        tabla.innerHTML = '<tr><td colspan="8" style="text-align:center;">Cargando productos...</td></tr>';
        
        // Carga todos los datos al array global
        allProducts = await getproducto(); 
        
        if (allProducts.length === 0) {
            tabla.innerHTML = '<tr><td colspan="8" style="text-align:center;">No se encontraron productos.</td></tr>';
            return;
        }

        currentPage = 1; 
        // Llama a la función principal, que ahora usa allProducts y renderiza controles
        renderizarProductos(); 
        
    } catch (error) {
        console.error("Error al inicializar el listado paginado:", error);
        tabla.innerHTML = '<tr><td colspan="8" style="color:red; text-align:center;">Error al cargar los datos del servidor.</td></tr>';
    }
}

// Ejecución al cargar el script
inicializarListado();