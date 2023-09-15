var contentLeft = document.querySelector('.content-left');
var contentRight = document.querySelector('.content-right');
var titlePokemon = document.querySelector('.name');
var typePokemon = document.querySelector('.types');
var pokemonImg = document.querySelector('.pokemon-img')

const apiURL = 'https://pokeapi.co/api/v2/pokemon'
var pokemonInfo
let page = 1;
let limit = 20;

const getPokemons = async () => {
    try {
        const response = await axios.get(`${apiURL}`, {
            params: {
                _page: page,
                _limit: limit,
            },
        });
        pokemonInfo = response.data;
        renderName(pokemonInfo);
    } catch (errors) {
        console.log(errors);
    } 
};

getPokemons();

//trả về thẻ li và có giá trị name
function renderName(pokemons) {
    console.log(pokemons);
    var listName = document.querySelector(".listName");
    var htmls = pokemons.results.map(function(pokemon,index){
        return `
            <li>
                <button onclick="myPokemon(${index})">${pokemon.name}</button>
            </li>
        `;
    })
    listName.innerHTML = htmls.join('');
}

// bấm vào thẻ li(tên pokemon) và in ra dữ liệu

function myPokemon(id){
    var selectedPokemon = pokemonInfo.results[id];
    var pokemonUrl = selectedPokemon.url;
    
    axios.get(pokemonUrl)
        .then(function(response){
            var pokemonData = response.data;
            var pokemonName = pokemonData.name;
            var pokemonImgUrl = pokemonData.sprites.front_default;

            titlePokemon.textContent = pokemonName;
            pokemonImg.innerHTML = `<img src="${pokemonImgUrl}" alt="${pokemonName}"/>`
     
            var typesList = pokemonData.types.map(function(typeData){
                return typeData.type.name;
            });
            typePokemon.textContent = typesList.join(", ")
    })
    .catch(function(error){
        console.log(error);
    })
}