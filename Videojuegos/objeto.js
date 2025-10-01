export class Objeto{
    constructor(nombre, tipo){
        this.nombre = nombre
        this.tipo = tipo
    }

    usar(jugador){
        if(this.tipo === "curacion"){
            console.log(`${jugador.nombre} usa ${this.nombre} y recupera 20 de vida`)
            jugador += 20
        } else if(tipo === "arma"){
            console.log(`${jugador.nombre} se equipa con un ${this.nombre}`)
        }
    }
}