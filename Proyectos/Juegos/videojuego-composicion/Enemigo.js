import { Personaje } from "./Personaje.js";

export class Enemigo extends Personaje {
  constructor(nombre, vida, tipo) {
    super(nombre, vida);
    this.tipo = tipo;
  }
}
