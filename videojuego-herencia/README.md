# 🕹️ Proyecto: Videojuego simple con herencia en JavaScript

Este proyecto es una versión mejorada del videojuego donde se usa **herencia con clases de ES6**.

## 📂 Estructura de archivos

```
/videojuego-herencia
  |-- Personaje.js   # Clase base para personajes
  |-- Jugador.js     # Clase Jugador (hereda de Personaje)
  |-- Enemigo.js     # Clase Enemigo (hereda de Personaje) y JefeFinal (hereda de Enemigo)
  |-- Objeto.js      # Clase Objeto que puede usar el jugador
  |-- main.js        # Archivo principal donde interactúan los objetos
```

## 🚀 Ejecución con Node.js

1. Asegúrate de tener **Node.js** instalado.  
   Comprueba con:
   ```bash
   node -v
   ```

2. Crea un archivo `package.json` en la carpeta con este contenido para permitir módulos ES:
   ```json
   {
     "type": "module"
   }
   ```

3. Abre una terminal en la carpeta del proyecto y ejecuta:
   ```bash
   node main.js
   ```

## 🌐 Ejecución en el navegador

1. Crea un archivo `index.html` en la carpeta con este contenido:

   ```html
   <!DOCTYPE html>
   <html lang="es">
   <head>
     <meta charset="UTF-8">
     <title>Videojuego JS con Herencia</title>
   </head>
   <body>
     <script type="module" src="main.js"></script>
   </body>
   </html>
   ```

2. Abre `index.html` en tu navegador.  
   Ve a la **consola del navegador (F12)** para ver el resultado.

## 🎯 Ejercicios propuestos

- Crear otra clase `Mago` que herede de `Jugador` con un método especial `lanzarHechizo()`.
- Añadir un nuevo tipo de `Enemigo` con comportamiento propio (ej. `Esqueleto`).
- Ampliar `Objeto` para incluir escudos que reduzcan el daño recibido.
- Implementar un sistema de turnos con varios enemigos atacando al jugador.

---

✨ Con este proyecto se aprende a usar **herencia**, a **organizar código en módulos** y a **hacer interactuar objetos relacionados** en JavaScript.
