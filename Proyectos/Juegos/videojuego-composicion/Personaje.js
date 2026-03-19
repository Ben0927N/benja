export class Personaje {
  constructor(nombre, vida) {
    this.nombre = nombre;
    this.vida = vida;
  }

  atacar(objetivo) {
    console.log(`${this.nombre} ataca a ${objetivo.nombre}`);
  }
}
