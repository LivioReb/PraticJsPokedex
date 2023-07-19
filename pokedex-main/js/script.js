const PokemonName = document.querySelector('.pokemon__name');
const PokemonNumber = document.querySelector('.pokemon__number');
const PokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev')
const buttoNext = document.querySelector('.btn-next')
let searchPokemon = 1

const fetchPokemon = async (pokemon)=> { // fetch siginifica buscar
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`) // await siginifica aguardar   
  
  if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data
  }

}

const renderPokemon = async (pokemon) => {
  
  PokemonName.innerHTML = 'Carregando...'
  PokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if(data){
    PokemonImage.style.display = 'block'
    PokemonName.innerHTML = data.name;
    PokemonNumber.innerHTML = data.id;
    PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    input.value = ''
    searchPokemon = data.id;
  }else{
    PokemonName.innerHTML = 'Não encontrado.';
    PokemonNumber.innerHTML = '';
    PokemonImage.style.display ='none';

  }

  
}

form.addEventListener('submit', (event)=> {
  event.preventDefault()
  
  renderPokemon(input.value.toLowerCase())
  
});

buttoNext.addEventListener('click', ()=> {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
  
});

buttonPrev.addEventListener('click', ()=> {

  if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
  }
  
});

renderPokemon(searchPokemon);