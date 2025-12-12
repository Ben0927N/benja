import { cargarPagina } from './enlaces.js'; 

// Esperar a que el DOM esté completamente cargado para usar el sidebar
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar a");
    
    // Listener para el menú lateral
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const page = link.dataset.page; 

            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            cargarPagina(page); 
        });
    });

    // Listener para el botón "Añadir productos" en Tabla productos
    document.addEventListener("click", e => {
        if (e.target && e.target.id === "AnadirProductos") {
            e.preventDefault();
            cargarPagina("AnadirProductos");
        }
    });
    cargarPagina("inicio");
});