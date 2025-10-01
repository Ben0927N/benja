// Clase para representar un objeto que puede usar el jugador
export class Objeto {
  constructor(nombre, tipo) {
    this.nombre = nombre;
    this.tipo = tipo;
  }

  usar(jugador) {
    if (this.tipo === "curación") {
      console.log(`${jugador.nombre} usa ${this.nombre} y recupera 20 de vida`);
      jugador.vida += 20;
    } else if (this.tipo === "arma") {
      console.log(`${jugador.nombre} equipa ${this.nombre} y aumenta su daño`);
      jugador.daño += 5;
    }
  }
}
