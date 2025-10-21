const URL_API = 'https://pokeapi.co/api/v2/pokemon/'

async function getpokemon(id) {
    const response = await fetch(`${URL_API}${id}`)
    if(!response.ok)

        throw new Error(`Error ${response.status} en la solicitud para el ID: ${id}`) 
    const data = await response.json()
    return data
}


const searchInput = document.getElementById('buscarIdPokemon'); 
const searchButton = document.getElementById('buscar-boton');  

const container = document.querySelector('.container-pokedex') 


if (searchButton) {
    searchButton.addEventListener('click', buscarIDPokemon); 
} 

function createCard(pokemon){
    const height_m = (pokemon.height / 10).toFixed(1); 
    const weight_kg = (pokemon.weight / 10).toFixed(1);
    
    return`
        <div class = "pokemon-card">
            <img src ="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>#${pokemon.id} - ${pokemon.name.toUpperCase()}</h3>
            <p>Tipo(s): ${pokemon.types.map(t => t.type.name).join(", ")}</p>
            <p>Altura: ${height_m} m</p>
            <p>Peso: ${weight_kg} kg</p>
        </div>
    `
}


async function buscarIDPokemon(){
    const pokemonId = searchInput.value;
    if (!pokemonId) {
        container.innerHTML = '<h2>Por favor, introduce un ID de Pokémon.</h2>';
        return;
    }

    try {
        const pokemon = await getpokemon(pokemonId);
        const TarjetaHTML = createCard(pokemon); 
        container.innerHTML = TarjetaHTML;
        
    } catch (error) {
        container.innerHTML = '<h2>No se encontró el Pokémon.</h2>';
        console.error("Error al buscar Pokémon:", error);
    }
}


async function buclePokemon(){
    container.innerHTML = '<h2>Cargando todos los Pokémon...</h2>'; 
    let allCardsHTML = '';
    
    for (let i = 1; i <= 25; i++) {

        try {
            const pokemon = await getpokemon(i); 
            
            if (pokemon) {
                allCardsHTML += createCard(pokemon);
            }
        } catch (error) {
            console.warn(`No se pudo cargar el Pokémon con ID ${i}: ${error.message}`);
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