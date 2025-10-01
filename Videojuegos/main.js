//Importamos todas las clases

import { Personaje } from "./personaje.js";
import { Enemigo } from "./enemigo.js";
import { Objeto } from "./objeto.js";

const jugador = new Personaje("mario")

const enemigo = new Enemigo("Bowser")

const pocion = new Objeto("Posicion","curacion")
const espada = new Objeto("Espada","arma")

jugador.recoger(pocion)
jugador.recoger(espada)

jugador.mostrarEstado()
enemigo.mostrarEstado()

jugador.atacar(enemigo)
enemigo.atacar(jugador)

pocion.usar(jugador)

jugador.mostrarEstado()
enemigo.mostrarEstado()