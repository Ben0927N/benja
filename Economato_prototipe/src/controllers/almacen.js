import { productos } from '../services/productos.js';
import { filtrarPorCategoria, buscarProducto, ordenarPorPrecio, comprobarStockMinimo } from '../utils/funciones.js';
import { renderizarTabla } from '../view/almacen-ui.js';
import { getproducto, getCategorias } from '../services/economatoServices.js';

const inputBusqueda = document.querySelector('#busqueda');
const btnBuscar = document.querySelector('#btnBuscar');
const btnStock = document.querySelector('#btnStock');
const btnMostrarTodos = document.querySelector('#btnAllProducts');
const selectCategoria = document.querySelector('#categoriaSelect');
const selectOrden = document.querySelector('#ordenSelect');

const evenMap = [
  {selector: '#btnBuscar', event: 'click', handler: onBuscar},
  {selector: '#ordenSelect', event: 'change', handler: onOrdenar},
  {selector: '#btnAllProducts', event: 'click', handler: onShowAll},
  {selector: '#categoriasSelect', event: 'change', handler: onfiltrar},
]

let productos = [];
let productosMostrados = [];

async function inicializar() {
  productos = await getproducto()
  productosMostrados = [...productos]
  let categorias = await getCategorias()
  renderizarTabla(productosMostrados)
  generarCategorias(categorias)
  bindEvents(evenMap)
}

function onBuscar() {
  const termino = inputBusqueda.value.trim()
  productosMostrados = buscarProducto(productos, termino)
  renderizarTabla(productosMostrados)
}

function onOrdenar() {
  const orden = selectOrden.value
  productosMostrados = ordenarPorPrecio(productos, orden)
}

function onfiltrar() {
  const cat = selectCategoria.value
  productosMostrados = cat ? filtrarPorCategoria(productos, cat) : [...productos]
  renderizarTabla(productosMostrados)
}

function onShowAll() {
  productosMostrados = [...productos];
  inputBusqueda.value = '';
  selectCategoria.value = '';
  renderizarTabla(productosMostrados);
}

function bindEvents(events) {
  for (const {selector, event, handler, options} of events) {
    const el = document.querySelector(selector)
      if (el) el.addEventListener(event, handler, options)
  }
}

export function generarCategorias(categorias){
    const selectCategoria = document.getElementById('categoriaSelect')

    //Podemos limpiar opciones previas si quieres

    selectCategoria.textContent = ''

    //Vamos a crear la opcion por defecto

    const opcionDefault = document.createElement('option')
    opcionDefault.value = ''
    opcionDefault.textContent = '--- Categoria ---'
    selectCategoria.appendChild(opcionDefault)

    //Recorrer categorias y crear o modificar el DOM

    categorias.forEach(categorias => {
      const option = document.createElement('option')
      option.value = categorias.nombre
      option.textContent = categorias.nombre
      selectCategoria.appendChild(option)
    }
  );
}

inicializar()