export class enemigo{
    constructor(nombre, vida = 50, dano = 5){
        this.nombre = nombre
        this.vida = vida
        this.dano = dano
    }

    atacar(jugador){
        console.log(`${this.nombre} ataca a ${jugador.nombre}`)
        jugador.vida -= this.dano
    }

    mostrarEstado(){
        console.log(`${this.nombre} -> Vida: ${this.vida}`)
    }
}