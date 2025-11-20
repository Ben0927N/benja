document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar a");
  const content = document.getElementById("content");
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  function cargarCSS(href) {
    // Elimina el CSS dinámico anterior si existe
    let oldLink = document.querySelector('link[data-dynamic="true"]');
    if (oldLink) oldLink.remove();

    // Crea nuevo <link>
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.dynamic = "true"; // marca para poder borrarlo luego
    document.head.appendChild(link);
  }

async function cargarPagina(page) {
  try {
    const response = await fetch(`pages/${page}.html`);
    if (!response.ok) throw new Error("Página no encontrada");
    const html = await response.text();
    document.getElementById("content").innerHTML = html;

    // Inyectar CSS según la página
    switch(page) {
      case "AnadirProductos":
        cargarCSS("assets/css/productos.css");
        break;
      case "index":
        cargarCSS("assets/css/index.css");
        break;
      case "usuarios":
        cargarCSS("assets/css/usuarios.css");
        break;
      default:
        cargarCSS("assets/css/menu.css"); // estilo base
    }
  } catch (error) {
    document.getElementById("content").innerHTML = `<p style='color:red'>${error.message}</p>`;
  }
}


  document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = e.target.dataset.page;
    cargarPagina(page);
  });
});


  // Cargar contenido dinámicamente
  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;

      // Cambiar estado activo del menú
      links.forEach(l => l.classList.remove("active"));
      e.target.classList.add("active");

      try {
        const response = await fetch(`pages/${page}.html`);
        if (!response.ok) throw new Error("Página no encontrada");
        const html = await response.text();
        content.innerHTML = html;
        sidebar.classList.remove("open"); // cerrar menú móvil
      } catch (error) {
        content.innerHTML = `<p style='color:red'>${error.message}</p>`;
      }
    });
  });
});