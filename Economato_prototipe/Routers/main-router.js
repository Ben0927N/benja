import { cargarPagina } from './enlaces.js'; 

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar a");
    
    // Listener para el menú lateral (links)
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const page = link.dataset.page; 

            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            cargarPagina(page); // Llama a la función importada
        });
    });

    // Listener para el botón "Añadir productos" (delegación)
    document.addEventListener("click", e => {
        if (e.target && e.target.id === "AnadirProductos") {
            e.preventDefault();
            cargarPagina("AnadirProductos");
        }
    });
    
    // Carga la página inicial
    cargarPagina("inicio");
});