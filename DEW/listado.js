let seleccion = 459;
let descuento = 25;

let productos = [
    {id: 123, nombre: "Pantalon", precio: 25, imagen: 'pantalon.png'},
    {id: 459, nombre: "Camisa", precio: 15, imagen: 'camisa.png'},
    {id: 560, nombre: "Zapatos", precio: 45, imagen: 'zapatos.png'},
    {id: 789, nombre: "Gorra", precio: 5, imagen: 'gorra.png'}
]

function buscarProducto(seleccion) {
    for(let i=0; i<productos.length; i++){
        if(productos[i].id === seleccion){
            console.log(productos[i]);
        }
    }
}
function aplicarDescuento(seleccion,descuento) {
    let producto = buscarProducto(seleccion);
    if(producto) {
        let prec = producto.precio - (producto.precio * (descuento / 100));
        console.log("El precio con descuento es: " + prec);
    } else {
        console.log("Producto no encontrado");
    }
}

aplicarDescuento(123, 20);