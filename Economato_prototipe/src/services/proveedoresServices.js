const URL_API = 'http://localhost:3000'

export async function obtenerTodosLosProveedores() {
    try {
        const response = await fetch(`${URL_API}/proveedores`)
        
        if (!response.ok) {
            throw new Error(`Error al obtener los proveedores: ${response.status}`)
        }
        
        const data = await response.json()
        
        return data
        
    } catch (error) {
        console.error("Fallo la conexión con la API de proveedores:", error)
        return []
    }
}