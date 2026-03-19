export function filtrarPorCategoria(productos, categoria) {
  console.log(productos)
  return productos.filter(p=>p.categoria?.nombre?.toLowerCase() == categoria.toLowerCase())
}

export function buscarProducto(productos, nombre) {
  return productos.filter(p=> (p.nombre || '').includes(nombre)) 
}

export function ordenarPorPrecio(productos, orden = 'asc') {
  const factor = orden  ==='asc' ? 1 : -1
  return [...productos].sort((a,b) => factor * ((a.precio || 0) - (b.precio || 0))) 
}

export function comprobarStockMinimo(productos) {
 //
}