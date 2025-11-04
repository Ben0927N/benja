const URL_API = 'http://localhost:3000/'

const tipo = ['proveedores', 'categorias', 'productos']

export async function getproducto(tipo) {
    try {
        if (tipo == 'productos'){
            const response = await fetch(`${URL_API}${tipo}`)
            if(!response.ok){
                throw new Error('Error al obtener los proveedores')
            }
            const data = await response.json()
            return data
        }
    } catch  (error) {
        console.log(error)
        return  []
    }
}
