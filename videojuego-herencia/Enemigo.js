import { Personaje } from "./Personaje.js";

// Enemigo hereda de Personaje
export class Enemigo extends Personaje {
  constructor(nombre, vida = 50, daño = 5) {
    super(nombre, vida, daño);
  }

  gritar() {
    console.log(`${this.nombre} grita: "¡Te voy a derrotar!"`);
  }
}

// JefeFinal hereda de Enemigo
export class JefeFinal extends Enemigo {
  constructor(nombre, vida = 200, daño = 20, poderEspecial = "Fuego infernal") {
    super(nombre, vida, daño);
    this.poderEspecial = poderEspecial;
  }

  usarPoderEspecial(jugador) {
    console.log(`${this.nombre} usa ${this.poderEspecial} contra ${jugador.nombre}`);
    jugador.vida -= 40;
  }
}
