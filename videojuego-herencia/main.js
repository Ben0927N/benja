import { Jugador } from "./Jugador.js";
import { Enemigo, JefeFinal } from "./Enemigo.js";
import { Objeto } from "./Objeto.js";

// Crear jugador
const jugador = new Jugador("Link");

// Crear enemigos
const goblin = new Enemigo("Goblin", 60, 8);
const jefe = new JefeFinal("Dragón", 200, 15, "Llamarada de fuego");

// Crear objetos
const pocion = new Objeto("Poción", "curación");
const espada = new Objeto("Espada", "arma");

// Jugador recoge objetos
jugador.recoger(pocion);
jugador.recoger(espada);

// Estado inicial
jugador.mostrarEstado();
goblin.mostrarEstado();
jefe.mostrarEstado();

// Combate
jugador.atacar(goblin);
goblin.gritar();
goblin.atacar(jugador);

jefe.usarPoderEspecial(jugador);
jugador.usarObjeto(pocion);
jugador.usarObjeto(espada);
jugador.atacar(jefe);

// Estado final
jugador.mostrarEstado();
goblin.mostrarEstado();
jefe.mostrarEstado();
