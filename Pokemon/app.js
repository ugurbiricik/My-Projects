const inputSelected = document.querySelector("#inputPoke");
const btnSelected = document.querySelector("#btnPoke");
const container = document.querySelector(".container");

const pokeCount = 30;
const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {
  const { name, weight } = pokemon;
  const id = pokemon.id.toString().padStart(3, "0");
  const typePoke = pokemon.types[0].type.name;
  const pokeElement = document.createElement(`div`);
  pokeElement.classList.add("poke-div");

  pokeElement.innerHTML = `<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image" />
    <h2 class="poke-name">${name}</h4>
        <p class="poke-type">${typePoke}</p>
        <p class="poke-weight">${weight} kg</p>
        <p class="poke-id">${id}</p>`;

  container.appendChild(pokeElement);
};

initPokemon();

inputSelected.addEventListener("input", () => {
  const pokeNames = document.querySelectorAll(".poke-name");
  const search = inputSelected.value.toLowerCase();
  // const pokemons = document.querySelectorAll("poke-div")

  pokeNames.forEach((pokeName) => {
    pokeName.parentElement.style.display = "block";
    if (!pokeName.innerHTML.toLowerCase().includes(search))
      pokeName.parentElement.style.display = "none";
  });
});
