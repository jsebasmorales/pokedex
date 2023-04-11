// Pendiente crear array objetos de tipo de pokemon

// REQUERIMIENTOS
// ! Peso
// ! Movimientos / Ataques
// ! Mostrar Stats en el modal (Opcional)
document.getElementById ('pokemonDetail-card').style.display = 'none';
// Fetch de creación de los pokemons
fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=$25`)
        .then((response) => response.json())
        .then((data) => {
            const pokemonDiv = document.getElementById("pokemon");
            data.results.map((elemento) => {
                pokemonInformation(elemento.url);
                //pokemonDiv.appendChild(crearElemento(elemento.name, elemento.url));
                //console.log('elemento', elemento.name);
            });
        })
        .catch((error) => {
            console.error(error);
        });

// Crear card para cada Pokemon
const crearElemento = (nombre, image, id) => {
    const personajeCard = document.createElement("div");
    personajeCard.className += "onePokemon";

    // Pokemon Image
    let pokemonImage = document.createElement("img");
    pokemonImage.className += "imgPokemon";
    pokemonImage.src = image;

    // Pokemon Name
    let pokemonName = document.createElement("h2");
    const nombrePersonaje = document.createTextNode(nombre);
    pokemonName.appendChild(nombrePersonaje);

    // Pokemon ID
    let pokemonID = document.createElement("p");
    const idPersonaje = document.createTextNode(`No. ${id}`);
    pokemonID.appendChild(idPersonaje);

    personajeCard.appendChild(pokemonImage);
    personajeCard.appendChild(pokemonName);
    personajeCard.appendChild(pokemonID);
    //personajeCard.appendChild (pokemonType);

    return personajeCard;
};

// Permitir buscar dando enter en el input Pokemon List
const input = document.querySelector("#pokemonNumb");
let valorInput = 0;

input.addEventListener("keydown", function (event) {
    let errorMsj = document.getElementById("errorPokemon");
    errorMsj.innerHTML = "";

    if (event.key === "Enter") {
        valorInput = input.value;
        if (valorInput <= 649) {
            console.log(valorInput);
            pokemonList(valorInput);
            document.getElementById("pokemon").innerHTML = "";
        } else {
            const errorText = document.createTextNode("No puedo listar más de 649 Pokemons");
            errorMsj.appendChild(errorText);
        }
    }
});

// Mostar X cantidad de Pokemons
const pokemonList = (valorInput) => {
    document.getElementById ('pokemon').innerHTML = '';
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${valorInput}`)
        .then((response) => response.json())
        .then((data) => {
            const pokemonDiv = document.getElementById("pokemon");
            data.results.map((elemento) => {
                pokemonInformation(elemento.url);
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

// Busca la data de todos los pokemons
const pokemonInformation = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const pokemonDiv = document.getElementById("pokemon");
            pokemonDiv.appendChild(crearElemento(data.name, data.sprites.other.dream_world.front_default, data.id));
        })
        .catch((error) => {
            console.error(error);
        });
};

// Mostar la data de un solo Pokemon

// Permitir buscar dando enter en el input One Pokemon
const detailPokemon = document.querySelector("#pokemonDetail-search");
let pokemonName = 0;

detailPokemon.addEventListener("keydown", function (event) {
    let errorPokemon = document.getElementById("pokemonDetail-error");
    errorPokemon.innerHTML = "";
    if (event.key === "Enter") {
        pokemonName = detailPokemon.value.toLowerCase();        
        if (pokemonName !== '') {
            pokemonDetail (pokemonName);
        }
    }
});

// Buscar pokemón

const pokemonDetail = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            showDetail (data);
        })
        .catch((error) => {
            const errorDetail = document.getElementById('pokemonDetail-error');
            errorDetail.innerHTML = "";
            const eraras = document.createTextNode(`NO encuentro un Pokemón con el nombre/ID ${pokemonName.toUpperCase()}.`);
            errorDetail.appendChild (eraras);
                console.log(error);
        });
}

const showDetail = (data) => {
    document.getElementById ('pokemonDetail-card').style.display = 'block';
    document.getElementById("pokemonDetail-card--img").innerHTML ="";
    document.getElementById("pokemonDetail-card--name").innerHTML ="";
    document.getElementById("pokemonDetail-card--id").innerHTML ="";
    document.getElementById("pokemonDetail-card--height").innerHTML ="";
    document.getElementById("pokemonDetail-card--weight").innerHTML ="";
    document.getElementById("pokemonDetail-card--abilities").innerHTML ="";


    // Pokemon Image
    const imgDiv = document.getElementById ('pokemonDetail-card--img');
    let pokeImg = document.createElement("img");
    pokeImg.className += "pokeImgDetail";
    pokeImg.src = data.sprites.other.dream_world.front_default;
    imgDiv.appendChild (pokeImg);

    // Pokemon Name
    const pokeName = document.getElementById ('pokemonDetail-card--name');
    const name = document.createTextNode(data.name);
    pokeName.appendChild (name);

    // Pokemon ID
    const pokeId = document.getElementById ('pokemonDetail-card--id');
    const id = document.createTextNode(`ID: ${data.id}`);
    pokeId.appendChild (id);

    // Pokemon Height
    const pokeHeight = document.getElementById ('pokemonDetail-card--height');
    const height = document.createTextNode(`Height: ${data.id}`);
    pokeHeight.appendChild (height);
    
    // Pokemon Weight
    const pokeWeight = document.getElementById ('pokemonDetail-card--weight');
    const weight = document.createTextNode(`Weight: ${data.weight}`);
    pokeWeight.appendChild (weight);

    // Obtener las habilidades
    const habilidades = data.abilities;
    for (const habilidad of habilidades) {
        const nombreHabilidad = habilidad.ability.name;
        const abilities = document.getElementById ('pokemonDetail-card--abilities');

        let abilitie = document.createElement("p");
        abilitie.className += "abilities";
        const pokeAbilitie = document.createTextNode(nombreHabilidad);
        abilitie.appendChild(pokeAbilitie);
        abilities.appendChild(abilitie);
    }
}