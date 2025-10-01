// Ejemplos de composición: módulos que añaden comportamientos

export const puedeCurarse = (personaje) => ({
  curar: () => {
    personaje.vida += 10;
    console.log(`${personaje.nombre} se cura y ahora tiene ${personaje.vida} de vida`);
  }
});

export const puedeDisparar = (personaje) => ({
  disparar: () => {
    console.log(`${personaje.nombre} dispara un proyectil!`);
  }
});

export const puedeSaltar = (personaje) => ({
  saltar: () => {
    console.log(`${personaje.nombre} salta hacia arriba`);
  }
});
