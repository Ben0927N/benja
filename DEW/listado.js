let selec = 3;
let descuento = 25;

let productos = [
    {id: 0, nombre: "Pantalon", precio: 25, imagen: 'pantalon.png'},
    {id: 1, nombre: "Camisa", precio: 15, imagen: 'camisa.png'},
    {id: 2, nombre: "Zapatos", precio: 45, imagen: 'zapatos.png'},
    {id: 3, nombre: "Gorra", precio: 5, imagen: 'gorra.png'}
]

/*
for (let i=0; i<productos.length; i++){
    if(productos[i].id === selec){
        console.log(productos[i]);
    }
}
*/

function buscarProducto() {
    for(let i=0; i<productos.length; i++){
        if(productos[i].id === selec){
            console.log(productos[i]);
        }
    }
}



function aplicarDescuento() {
    for(let i=0; i<productos.length; i++){
        if(productos[i].id === selec){
            let prec = productos[i].precio - (productos[i].precio * (descuento / 100));
            console.log("El precio con descuento es: " + prec);
        }
    }
}

buscarProducto();
aplicarDescuento();