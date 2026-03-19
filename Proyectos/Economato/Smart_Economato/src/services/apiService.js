const API_URL = "https://localhost:3000"

async function obtenerProductos() {
    try {
        const response = await fetch('https:///productos');
        if (!response.ok) {
            throw new Error('Error $response.status: $response.statusText');
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}

const productos = await obtenerProductos();