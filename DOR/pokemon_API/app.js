const URL_API = 'https://pokeapi.co/api/v2/pokemon/'

async function getpokemon(nombre_o_id) {
    const buscarlo = String(nombre_o_id)
    const response = await fetch(`${URL_API}${buscarlo}`)
    if(!response.ok)
        throw new Error(`Error ${response.status} en la solicitud para el ID o nombre: ${buscarlo}`) 
    const data = await response.json()
    return data
}


const searchInputId = document.getElementById('buscarIdPokemon'); 
const searchInputName = document.getElementById('buscarNombrePokemon');

const searchButtonId = document.getElementById('buscar-id-boton'); 
const searchButtonName = document.getElementById('buscar-nombre-boton');

const container = document.getElementById('container-pokedex');

if (searchButtonId) {
    searchButtonId.addEventListener('click', buscarIDPokemon); 
}
if (searchButtonName) {
    searchButtonName.addEventListener('click', buscarNombrePokemon);
}

async function buscarIDPokemon(){
    const pokemonId = searchInputId.value;
    searchInputName.value = '';
    try {
        const pokemon = await getpokemon(pokemonId);
        const TarjetaHTML = createCard(pokemon); 
        container.innerHTML = TarjetaHTML;
        
    } catch (error) {
        container.innerHTML = '<h2>No se encontró el Pokémon.</h2>';
    }
}

async function buscarNombrePokemon(){
    const pokemonNombre = searchInputName.value;
    searchInputId.value = '';
    try {
        const pokemon = await getpokemon(pokemonNombre);
        const TarjetaHTML = createCard(pokemon); 
        container.innerHTML = TarjetaHTML;
        
    } catch (error) {
        container.innerHTML = '<h2>No se encontró el Pokémon.</h2>';
    }
}

function createCard(pokemon){
    return`
        <div class = "pokemon-card">
            <img src ="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>#${pokemon.id} - ${pokemon.name.toUpperCase()}</h3>
            <p>Tipo(s): ${pokemon.types.map(t => t.type.name).join(", ")}</p>
            <p>Altura: ${pokemon.height} m</p>
            <p>Peso: ${pokemon.weight} kg</p>
        </div>
    `
}

async function buclePokemon(){
    container.innerHTML = '<h2>Cargando todos los Pokémon...</h2>'; 
    let allCardsHTML = '';
    
    for (let i = 1; i <= 25; i++) {
            const pokemon = await getpokemon(i);
            if (pokemon) {
                allCardsHTML += createCard(pokemon);
            }
    }
    
    container.innerHTML = allCardsHTML; 
}


buclePokemon();

/* 

async function buclePokemonV2(){

    try{
        const promise = []
        for (let = i; i <= 10; i++){
            promises.push(getPokemon{i})
        }
        const pokemons = await Promise.all(promises)

        const cards = pokemons.map(p -> createCard(p).join(""))
        let contenedor = document.getElementById("poke.contenedor")
        contenedor.innerHtml= cards
    } catch (error) {
         
    }

}

buclePokemonV2();
*/

/*

async function buclePokemonV3(){
    try{
        const promises = [];
        for(let i = 1; i <= 10; i++){
            if(i == 4)
                promises.push(getpokemon(i))
            else promises.push(getpokemon(i))
        }

        const pokemons = await Promise.allSettled(promises)
        console.log(pokemons)

        const successful = pokemons
        .filter (r => r.status === "fulfilled")
        .map (r => r.value)

        const cards = successful.map (p => createCard(p)).join("")
        let contenedor = document.getElementById("container-pokedex")
        contenedor.innerHTML = cards

    } catch (error){

    }
}

buclePokemonV3();

*/