Arquitectura
   La aplicación opera bajo el principio de una SPA con enrutamiento dinámico. 
   El archivo 'base' es "main.html", que actúa como el shell principal. 
   El enrutamiento se gestiona mediante "main-router.js" (que detecta la navegación en el siderbar) y 
   "enlaces.js" (que se encarga de cargar dinámicamente el HTML, CSS y el JavaScript asociado a la vista solicitada).

La lógica se divide de la siguiente manera:
   Vistas (html y css): Contienen la estructura y estilos que se inyectan en todas las paginas como front.
   Controladores (src/controllers/): Manejan la interacción del usuario (filtros, búsquedas, envíos de formularios)
   y coordinan las acciones, comunicándose con los Servicios para manipular los datos.
   Servicios (src/services/ y src/utils/): Contienen la lógica de negocio, manipulación de datos y 
   la comunicación con la API (que es JSON Server).

Componentes Clave por Módulo:
   1. Módulo de Autenticación (login.html, registro.html):
      La autenticación se maneja a través de "loginController.js" y "registroControllers.js", 
      que utilizan el "authService.js". Este servicio se comunica con usuarios del JSON para validar credenciales 
      (login) o verificar el usuario y email antes de crear un nuevo registro. Las utilidades "login-ui.js" y 
      "registro-uis.js" se encargan de mostrar los mensajes de error o exito en la interfaz.

   2. Módulo de Productos / Almacén (tabla.html, listado.html):
      Este es el núcleo de la gestión de inventario. El controlador principal "almacen.js" se encarga de la búsqueda, 
      el filtrado por categoría, y la ordenación por precio de los productos cargados (entre otras funcionalidades) desde 
      "economatoServices.js." La vista de listado paginado es gestionada por "listado.js", que implementa la estructura del 
      formulario para mejorar el rendimiento de la interfaz. La interacción con el DOM para renderizar la tabla es 
      responsabilidad de "almacen-ui.js".

   3. Módulo de Adición de Productos y Servicios:
      La creación de nuevos productos es manejada por "AnadirProductos.js", que se asegura de cargar las categorías 
      y proveedores necesarios antes de enviar la información a la API a través de la función "agregarProductoAPI" en 
      "economatoServices.js". Este servicio actúa como el cliente HTTP para todos los endpoints principales 
      (/productos, /categorias, /proveedores, /pedidos). El archivo "proveedoresService.js" es un servicio auxiliar para 
      obtener la lista de proveedores.

   4. Módulo de Pedidos (pedidos.html, HacerPedido.html, VerPedidos.html) (La intención que tenia con Pedidos):
      El controlador "pedidos.js" simplemente actúa como un seleccionador que dirige al usuario a las vistas de "Hacer Pedido" 
      o "Ver Pedidos". La lógica de creación de un pedido reside en "HacerPedido.js", que recupera la lista de proveedores y 
      envía el nuevo pedido a la API mediante "guardarNuevoPedidoAPI". Finalmente, "VerPedidos.js" se encarga de mostrar la 
      tabla de pedidos.