import { Personaje } from "./Personaje.js";

export class Jugador extends Personaje {
  constructor(nombre, vida, nivel) {
    super(nombre, vida);
    this.nivel = nivel;
  }

  subirNivel() {
    this.nivel++;
    console.log(`${this.nombre} sube a nivel ${this.nivel}`);
  }
}
