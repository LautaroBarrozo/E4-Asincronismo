const idInput = document.getElementById("pokemonInput");
const form = document.getElementById("form");
const centerFlex = document.getElementById("center-flex");

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
let serchId = "";
let infoPokemon = [];

const checkIdInput = () => {
  let valid = false;

  const idPokemon = idInput.value.trim();

  if (isEmpty(idPokemon)) {
    showError(idInput, "ERROR debe completar el campo");
  } else {
    showSuccsess(idInput);
    valid = true;
  }
  return valid;
};

const isEmpty = (value) => value === "";

const showError = (input, message) => {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  error.classList.remove("success");
  error.classList.add("error");
  error.textContent = message;
};

const showSuccsess = (input, message) => {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  error.classList.remove("error");
  error.classList.add("success");
  error.textContent = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const idPokemon = idInput.value.trim();

  let isIdValid = checkIdInput();
  if (isIdValid) {
    serchId = baseUrl + idPokemon;
    fetchPokemon(serchId);
  } else {
    hidePokemonCard();
  }
});

const fetchPokemon = async (serchId) => {
  try {
    const res = await fetch(`${serchId}`);
    const data = await res.json();
    infoPokemon = data;
    return showPokemonCard(infoPokemon);
  } catch (error) {
    showError(idInput, "ERROR el numero ingresado no es valido");
    hidePokemonCard();
  }
};

const renderPokemonCard = (infoPokemon) => {
  return `
  <div class="pokemon-card">
    <img src="${infoPokemon.sprites.other.home.front_default ? infoPokemon.sprites.other.home.front_default : infoPokemon.sprites.other["official-artwork"].front_default}" alt="imagen de pokemon" class="pokemon-image">
    <h1 class="pokemon-name">${infoPokemon.name.toUpperCase()}</h1>

    <div class="pokemon-type">
        ${infoPokemon.types
      .map((type) => {
        return `<h2 class="type-style ${type.type.name
          }">${type.type.name.toUpperCase()}</h2>`;
      })
      .join("")}
    </div>

    <div class="pokemon-heightWeight">
        <h3 class="height-weight">altura: ${infoPokemon.height / 10}m</h3>
        <h3 class="height-weight">peso: ${infoPokemon.weight / 10}kg</h3>
    </div>

  </div>
  `;
};

const showPokemonCard = (infoPokemon) => {
  centerFlex.innerHTML = renderPokemonCard(infoPokemon);
};

const hidePokemonCard = () => (centerFlex.innerHTML = "");
