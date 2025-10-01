// Clase base: Personaje
export class Personaje {
  constructor(nombre, vida = 100, daño = 10) {
    this.nombre = nombre;
    this.vida = vida;
    this.daño = daño;
  }

  atacar(objetivo) {
    console.log(`${this.nombre} ataca a ${objetivo.nombre}`);
    objetivo.vida -= this.daño;
  }

  mostrarEstado() {
    console.log(`${this.nombre} → Vida: ${this.vida}`);
  }
}
