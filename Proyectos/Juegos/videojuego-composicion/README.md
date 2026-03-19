# Proyecto: Videojuego con Herencia y Composición

Este proyecto muestra el uso de **herencia** y **composición** en JavaScript.

## Herencia
- `Personaje` es la clase base.
- `Jugador` y `Enemigo` extienden de `Personaje`.

## Composición
- Habilidades como `curar`, `disparar` y `saltar` se implementan como funciones que añaden comportamientos.
- Se pueden aplicar libremente a distintos objetos sin necesidad de una jerarquía compleja.

## Ejecución
Ejecuta con Node.js:

```bash
node main.js
```

Esto demostrará:
- Acciones básicas de herencia (`atacar`, `subirNivel`).
- Acciones de composición (`curar`, `disparar`, `saltar`).
