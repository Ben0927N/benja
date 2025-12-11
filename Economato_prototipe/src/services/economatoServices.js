const URL_API = 'http://localhost:3000'

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

export async function agregarProductoAPI(producto) {
    try {
        const response = await fetch(`${URL_API}/productos`, {
            method: 'POST', // Le dice al servidor que queremos GUARDAR un dato
            headers: {
                'Content-Type': 'application/json' // Indica que el cuerpo es JSON
            },
            body: JSON.stringify(producto) // Convierte el objeto JavaScript a texto JSON
        })
        if (!response.ok) {
            throw new Error(`Error al guardar: ${response.statusText}`);
        }
        // Devuelve el objeto guardado (incluye el ID que JSON Server le asignó)
        return await response.json(); 
    } catch (error) {
        console.error("Error al añadir producto:", error);
        throw new Error(`Fallo al guardar: ${error.message}`);
    }
}

export async function getProveedores() {
    const URL_API = 'http://localhost:3000'
    // La URL_API debe estar accesible aquí.
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

export async function guardarNuevoPedidoAPI(pedido) {
    const URL_API = 'http://localhost:3000'
    try {
        const response = await fetch(`${URL_API}/pedidos`, {
            method: 'POST', // Queremos GUARDAR un nuevo recurso
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido) // El objeto del pedido
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