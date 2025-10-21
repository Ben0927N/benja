const URL_API = 'https://pokeapi.co/api/v2/pokemon/'

async function getpokemon(id) {
    const response = await fetch(`${URL_API}${id}`)
    if(!response.ok)
        throw new Error(`Error ${response.status} en la solicitud....`)
    const data = await response.json()
    return data
}


const searchInput = document.getElementById('buscarIdPokemon'); 
const searchButton = document.getElementById('buscar-boton');  
const container = document.querySelector('.container-pokedex')


if (searchButton) {
    searchButton.addEventListener('click', buscarIDPokemon); 
} 



async function createCard(pokemon){
    return`
    <div class = "pokemon-card">
    <img src ="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h2>${pokemon.name}</h2>
    <p>${pokemon.height}</p>
    <p>${pokemon.types.map(t => t.type.name).join(", ")}</p>
    </div>
    `
}


async function buscarIDPokemon(id){
    const pokemonId = searchInput.value;
    const pokemon = await getpokemon(pokemonId);
    if(pokemon) {
        const TarjetaHTML = createCard(pokemon); 
        container.innerHTML = TarjetaHTML;
    } else {
        container.innerHTML = '<h2>No se encontró el Pokémon.</h2>';
    }
}

async function buclePokemon(){
    container.innerHTML = '<h2>Cargando todos los Pokémon...</h2>'; 
    let allCardsHTML = '';
    
    for (let i = 1; i <= 25; i++) {
        const pokemon = await getpokemon(i); 

        if (pokemon) {
            allCardsHTML += creatCard(pokemon);
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