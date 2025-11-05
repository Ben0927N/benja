const URL_API = 'http://localhost:3000'

export async function getproducto() {
    try {
            const response = await fetch(`${URL_API}/producto`)
            if(!response.ok){
                throw new Error('Error al obtener los proveedores')
            const data = await response.json()
            return data
        }
    } catch  (error) {
        console.log(error)
        return  []
    }
}

export async function getCategorias() {
    try {
            const response = await fetch(`${URL_API}/categorias`)
            if(!response.ok){
                throw new Error('Error al obtener los proveedores')
            const data = await response.json()
            return data
        }
    } catch  (error) {
        console.log(error)
        return  []
    }
}