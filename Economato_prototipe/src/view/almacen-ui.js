// Función para renderizar la tabla de productos
export function renderizarTabla(datos) {
  const tabla = document.querySelector('#tablaProductos tbody');
  const resumen = document.getElementById('resumen');

  if (!tabla || !resumen) {
      console.warn("renderizarTabla: Elementos de la tabla no encontrados. Cancelando renderizado.");
      return; 
  }

  tabla.innerHTML = '';

  if (datos.length === 0) {
    tabla.innerHTML = '<tr><td colspan="8" style="text-align:center;">No se encontraron productos</td></tr>';
    resumen.textContent = '';
    return;
  }

  // Rellenar la tabla con los datos de productos
  datos.forEach(p => {
    const fila = document.createElement('tr');
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

  const totalProductos = datos.length;
  const valorTotal = datos.reduce((acc, p) => acc + (p.precio || 0) * (p.stock || 0), 0).toFixed(2);
  resumen.textContent = `Productos mostrados: ${totalProductos} | Valor total del stock: ${valorTotal} €`;
}

// Función para generar las opciones del select de proveedores
export function generarProveedores(proveedores) {
  const selectProveedor = document.getElementById('proveedorSelect');

  if (!selectProveedor) {
    console.error("El elemento 'proveedorSelect' no fue encontrado en el DOM.");
    return;
  }

  // Limpiar opciones existentes
  selectProveedor.textContent = ''
  const opcionDefault = document.createElement('option')
  opcionDefault.value = ''
  opcionDefault.textContent = '--- Proveedor ---'
  selectProveedor.appendChild(opcionDefault)

  // Agregar nuevas opciones de proveedores
  proveedores.forEach(proveedor => {
    const option = document.createElement('option')
    option.value = proveedor.nombre
    option.dataset.isla = proveedor.isla || 'default';
    option.textContent = proveedor.nombre
    selectProveedor.appendChild(option)
  });
}