import { Jugador } from "./Jugador.js";
import { Enemigo } from "./Enemigo.js";
import { puedeCurarse, puedeDisparar, puedeSaltar } from "./Habilidades.js";

// Herencia
const link = new Jugador("Link", 100, 1);
const goblin = new Enemigo("Goblin", 50, "orco");

link.atacar(goblin);
link.subirNivel();

// Composición
function crearJugadorConHabilidades(nombre) {
  let base = { nombre, vida: 100 };
  return {
    ...base,
    ...puedeCurarse(base),
    ...puedeDisparar(base),
    ...puedeSaltar(base),
  };
}

const mario = crearJugadorConHabilidades("Mario");
mario.curar();
mario.disparar();
mario.saltar();
