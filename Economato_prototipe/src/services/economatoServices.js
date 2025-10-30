const URL_API = ''

async function getpokemon(nombre_o_id) {
    const buscarlo = String(nombre_o_id)
    const response = await fetch(`${URL_API}${buscarlo}`)
    const data = await response.json()
    return data
}