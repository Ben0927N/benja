document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar a");
  const content = document.getElementById("content");
  const sidebar = document.getElementById("sidebar");

  function cargarCSS(href) {
    const oldLink = document.querySelector('link[data-dynamic="true"]');
    if (oldLink) oldLink.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.dynamic = "true";
    document.head.appendChild(link);
  }

  function cargarScript(src) {
    const oldScript = document.querySelector('script[data-dynamic="true"]');
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.type = "module";
    script.src = src;
    script.dataset.dynamic = "true";
    document.body.appendChild(script);
  }

  async function cargarPagina(page) {
    try {
      const res = await fetch(`./pages/${page}.html`);
      if (!res.ok) throw new Error("Página no encontrada");
      const html = await res.text();
      content.innerHTML = html;

      switch (page) {
        case "AnadirProductos":
          cargarCSS("./assets/css/productos.css");
          cargarScript("./src/controllers/AnadirProductos.js");
          break;
        case "index":
          cargarCSS("./assets/css/index.css");
          cargarScript("./src/controllers/almacen.js"); 
          
          break;
        case "usuarios":
          cargarCSS("./assets/css/usuarios.css");
          cargarScript("./src/controllers/usuarios.js");
          break;
        default:
          cargarCSS("./assets/css/menu.css");
      }

      sidebar.classList.remove("open");

      // ✅ Detectar si existe el botón de volver y darle funcionalidad
      const btnVolver = document.getElementById("btnVolverProductos");
      if (btnVolver) {
        btnVolver.addEventListener("click", e => {
          e.preventDefault();
          cargarPagina("index");
        });
      }

    } catch (error) {
      content.innerHTML = `<p style='color:red'>${error.message}</p>`;
    }
  }

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

  // Listener para el botón "Añadir productos" dentro de index.html
  document.addEventListener("click", e => {
    if (e.target && e.target.id === "AnadirProductos") {
      e.preventDefault();
      cargarPagina("AnadirProductos");
    }
  });
});