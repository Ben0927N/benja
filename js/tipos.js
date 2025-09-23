let nombre = "Juan";
let edad = 30;
let peso = 82.3;
let encontrado = true;
let estado  = null;

let nombres = ["Ana", "Luis", "Carlos"];
console.log(nombres[0]);

let arraysRandom = ['pepe', 25, true];

let imagen = {nombre: 'usuario.png', size: 300};
console.log(imagen.nombre);

let a = 200;
let b = 'XXX';

let resultado = a / b;
console.log(typeof a);

let seleccion = 459;

let productos = [
    {id: 123, nombre: "Pantalon", precio: 25, imagen: 'pantalon.png'},
    {id: 459, nombre: "Camisa", precio: 15, imagen: 'camisa.png'},
    {id: 560, nombre: "Zapatos", precio: 45, imagen: 'zapatos.png'},
    {id: 789, nombre: "Gorra", precio: 5, imagen: 'gorra.png'}
]

for(let i=0; i<productos.length; i++){
    console.log(productos[i]);
}