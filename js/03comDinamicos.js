let nombre = "Juan";
let edad = 30;

let actual = new Date().getFullYear();

document.querySelector("body").innerHTML = `HOLA`;
<div>
    <p>Mi nombre es ${nombre}</p>
    <p>Mi edad es ${edad}</p>
    <p>Yo naci en el ${calcularNacimiento(edad)}</p>
</div>

function calcularNacimiento(edad) {
    return actual - edad;
}