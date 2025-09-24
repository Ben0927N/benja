let selec = 3;
let descuento = 25;

let productos = [
    {id: 0, nombre: "Pantalon", precio: 25, imagen: 'imagen\\pantalon.jpg'},
    {id: 1, nombre: "Camisa", precio: 15, imagen: 'imagen\\camisa.jpg'},
    {id: 2, nombre: "Zapatos", precio: 45, imagen: 'imagen\\zapatos.jpg'},
    {id: 3, nombre: "Gorra", precio: 5, imagen: 'imagen\\gorra.jpg'}
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
        if(productos[i].id == selec)
           return productos[i];
    }
}

function mostrarProducto( producto ){
 let pro = `
            <div>
                <p>El producto seleccionado es: ${producto.nombre}</p>
                <p>El precio es: ${producto.precio} </p>
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>`
            document.querySelector("body").innerHTML += pro;
        }

let productoSeleccionado = buscarProducto();

function aplicarDescuento() {
    for(let i=0; i<productos.length; i++){
        if(productos[i].id == selec){
    let prec = productos[i].precio - (productos[i].precio * (descuento / 100));
    let resulto = `
        <div>
            <p>El precio con descuento es: ${prec}</p>
            <p>El precio sin descuento es: ${productos[i].precio}</p>
        </div>`;
        document.querySelector("body").innerHTML = resulto;
    } else {
        resulto = `
        <div>
            <p> El precio sin descuento es: ${productos[i].precio} </p>
        </div>`;
        document.querySelector("body").innerHTML = resulto;
    }
    }
}

aplicarDescuento();
mostrarProducto(productoSeleccionado);