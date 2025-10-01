import { Personaje } from "./Personaje.js";

// Jugador hereda de Personaje
export class Jugador extends Personaje {
  constructor(nombre, vida = 100, daño = 15) {
    super(nombre, vida, daño);
    this.inventario = [];
  }

  recoger(objeto) {
    console.log(`${this.nombre} recoge un ${objeto.nombre}`);
    this.inventario.push(objeto);
  }

  usarObjeto(objeto) {
    objeto.usar(this);
  }

  mostrarEstado() {
    console.log(`${this.nombre} → Vida: ${this.vida}, Inventario: ${this.inventario.map(o => o.nombre).join(", ")}`);
  }
}
