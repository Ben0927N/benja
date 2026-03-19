// Esto representa al jugador de nuestro juego

//export es exportar un archivo
export class Personaje {

    constructor (nombre, vida = 100){ // vida = 100 por defecto
        this.nombre = nombre
        this.vida = vida
        this.inventario = [] //inventario vacio
    }

    //Metodos para atacar a nuestros enemigos

    atacar(enemigo){
        console.log(`${this.nombre} ataca a ${enemigo.nombre}`) //escribir a quien ataco
        enemigo.vida -= 10 //atacamos de forma estandar, quitar 10
    }

    recoger(objeto) {
        console.log(`${this.nombre} recoge un ${objeto.nombre}`)
        this.inventario.push(objeto) //en el inventario se guarda el objeto
    }

    mostrarEstado(){
        console.log(`${this.nombre} -> Vida: ${this.vida}, Inventario: ${this.inventario.map (o=> o.nombre).join(", ")}`)
    }
}