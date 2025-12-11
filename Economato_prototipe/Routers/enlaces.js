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
    return new Promise((resolve) => {
        const oldScript = document.querySelector('script[data-dynamic="true"]');
        if (oldScript) oldScript.remove();

        const script = document.createElement("script");
        script.type = "module";
        script.src = `${src}?v=${Date.now()}`;
        script.dataset.dynamic = "true";

        script.onload = resolve;
        script.onerror = () => {
            console.error(`Error al cargar el script: ${src}`);
            resolve();
        };

        document.body.appendChild(script);
    });
}

export async function cargarPagina(page) {
    const content = document.getElementById("content");
    const sidebar = document.getElementById("sidebar");

    try {
        const res = await fetch(`./pages/${page}.html`);
        if (!res.ok) throw new Error(`Página ${page}.html no encontrada`);
        const html = await res.text();
        content.innerHTML = html;

        switch (page) {
            case "AnadirProductos":
                cargarCSS("./assets/css/productos.css");
                await cargarScript("./src/controllers/AnadirProductos.js");
                break;
            case "tabla":
                cargarCSS("./assets/css/tabla.css");
                await cargarScript("./src/controllers/almacen.js");
                break;
            case "listado":
                cargarCSS("./assets/css/listado.css");
                await cargarScript("./src/controllers/listado.js");
                break;
            case "pedidos":
                cargarCSS("./assets/css/pedidos.css"); 
                await cargarScript("./src/controllers/pedidos.js"); 
                break;
            case "hacerPedido":
                cargarCSS("./assets/css/HacerPedido.css"); 
                await cargarScript("./src/controllers/HacerPedido.js"); 
                break;
            case "verPedidosTabla":
                cargarCSS("./assets/css/tabla.css"); 
                break;
            default:
                cargarCSS("./assets/css/main.css");
        }

        if (sidebar) sidebar.classList.remove("open");

    } catch (error) {
        console.error("Error al cargar la página:", error);
        // Si el JSON Server no está activo, el error de la tabla se mostrará aquí
        content.innerHTML = `<h2 style='color:red;'>Error al cargar: ${error.message}</h2>`;
    }
}