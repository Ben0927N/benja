const URL_API = 'http://localhost:3000'

// Función para obtener la lista de productos desde la API
export async function getproducto() {
    try {
        const response = await fetch(`${URL_API}/productos`)
        if (!response.ok) {
            throw new Error('Error al obtener los productos')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}

// Función para obtener la lista de categorías desde la API
export async function getCategorias() {
    try {
        const response = await fetch(`${URL_API}/categorias`)
        if (!response.ok) {
            throw new Error('Error al obtener las categorías')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}

// Función para agregar un nuevo producto a la API
export async function agregarProductoAPI(producto) {
    try {
        const response = await fetch(`${URL_API}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(producto) 
        })
        if (!response.ok) {
            throw new Error(`Error al guardar: ${response.statusText}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error("Error al añadir producto:", error);
        throw new Error(`Fallo al guardar: ${error.message}`);
    }
}

// Función para obtener la lista de proveedores desde la API
export async function getProveedores() {
    const URL_API = 'http://localhost:3000'
    try {
        const response = await fetch(`${URL_API}/proveedores`)
        if (!response.ok) {
            throw new Error('Error al obtener los proveedores')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Fallo en getProveedores:", error)
        return [] 
    }
}

// Función para guardar un nuevo pedido en la API
export async function guardarNuevoPedidoAPI(pedido) {
    const URL_API = 'http://localhost:3000'
    try {
        const response = await fetch(`${URL_API}/pedidos`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido) 
        })
        if (!response.ok) {
            throw new Error(`Error al guardar el pedido: ${response.statusText}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error("Error al añadir pedido:", error);
        throw new Error(`Fallo al guardar el pedido: ${error.message}`);
    }
}
