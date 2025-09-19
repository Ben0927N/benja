let nombre1 = "Juan";
let nombre2 = 'Fran';
let nombre3 = 'Pepe';
let edad = 30;
let edad2 = 43;

let actual = new Date().getFullYear();

let resultado = "Mis nombres son " + nombre1 + ' ' + nombre2 + " " + nombre3;
let resultado2 = `Mis nombres son ${nombre1} ${nombre2} ${nombre3}`;

console.log(resultado2);
console.log(resultado);

resultado1 = "Mi nombre es " + nombre1 + " y tengo " + edad + " años";
resultado3 = `Mi nombre es ${nombre2} y 
tengo ${edad2} años`;

console.log(resultado1);
console.log(resultado3);

function calcularNacimiento(edad) {
    return actual - edad;
}

resultado4 = `Mi nombre es ${nombre3},
tengo ${edad2} años y naci en el ${calcularNacimiento(edad2)}`;

console.log(resultado4);