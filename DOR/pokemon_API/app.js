async function getpokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()
    return data
}

const searchInput = document.getElementById('buscarIdPokemon'); 
const searchButton = document.getElementById('buscar-boton');  
const container = document.querySelector('.container-pokedex')

if (searchButton) {
    searchButton.addEventListener('click', buscarIDPokemon); 
} 

async function buscarIDPokemon(id){
    const pokemonId = searchInput.value;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if(response.ok) {//un true de que se conecta bien
        const pokemon = await response.json(); 
        const TarjetaHTML = creatCard(pokemon); 
        container.innerHTML = TarjetaHTML;
    } else {
        container.innerHTML = '<h2>No se encontró el Pokémon.</h2>';
    }
}

function creatCard(pokemon){
    const types = pokemon.types.map(t => t.type.name).join(', '); //tuve que buscarlo, pero es que en el array, buscar por nombre y tipo y los une con el join
    const height_m = (pokemon.height / 10).toFixed(1); // la altura pasamos de decimetros a metros
    const weight_kg = (pokemon.weight / 10).toFixed(1); // el peso pasamos hectogramos a kilogramos
    const TarjetaHTML = `
        <div class="pokemon-card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>#${pokemon.id} - ${pokemon.name.toUpperCase()}</h3>
            <p>Tipo(s): ${types}</p>
            <p>Altura: ${height_m} m</p>
            <p>Peso: ${weight_kg} kg</p>
        </div>
    `;
    
    return TarjetaHTML;
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

*/