// Pendiente crear array objetos de tipo de pokemon

// REQUERIMIENTOS
// ! Peso
// ! Movimientos / Ataques
// ! Mostrar Stats en el modal (Opcional)

const crearElemento = (nombre, image, id, type1, type2) => {
    const personajeCard = document.createElement("div");
    personajeCard.className += "onePokemon";
    
    // Pokemon Image
    let pokemonImage = document.createElement ("img");
    pokemonImage.className += "imgPokemon";
    pokemonImage.src = image;

    // Pokemon Name
    let pokemonName = document.createElement ("h2");
    const nombrePersonaje = document.createTextNode(nombre);
    pokemonName.appendChild (nombrePersonaje);

    // Pokemon ID
    let pokemonID = document.createElement ("p");
    const idPersonaje = document.createTextNode(`No. ${id}`);
    pokemonID.appendChild (idPersonaje);

    // Pokemon Types
    // ! Ajustar ya que no está teniendo en cuenta los pokemons de un solo type
    const pokemonType = document.createElement("div");
    pokemonType.className += "pokemonType";
    let pokemonType1 = document.createElement ("p");
    const type1Personaje = document.createTextNode(type1);
    pokemonType1.appendChild (type1Personaje);
    pokemonType.appendChild(pokemonType1);
    let pokemonType2 = document.createElement ("p");
    const type2Personaje = document.createTextNode(type2);
    pokemonType2.appendChild (type2Personaje);
    pokemonType.appendChild(pokemonType2);
    
    // Pokemon Button
    const pokemonButton = document.createElement ("button");
    pokemonButton.setAttribute ('type', 'button');
    pokemonButton.setAttribute ('name', 'pokemonButton');
    pokemonButton.setAttribute ('value', 'Ver más');
    pokemonButton.textContent = 'Ver más';
    pokemonButton.addEventListener('click', () => openModal(image));

    personajeCard.appendChild (pokemonImage);
    personajeCard.appendChild (pokemonID);
    personajeCard.appendChild (pokemonType);
    personajeCard.appendChild (pokemonButton);

    return personajeCard;
}

const openModal = (image) => {
    const modal = document.getElementById("pokeModal");

    modal.style.display = "block";
    document.querySelector(".close").addEventListener("click", function() {
        document.getElementById("pokeModal").style.display = "none";
    });
    document.addEventListener("click", function(event) {
        // Si se hace clic fuera del modal, cerrarlo
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Pokemon Image
    const modalCont = document.getElementById ("modalInfo");
    let pokemonImage = document.createElement ("img");
    pokemonImage.className += "imgPokemon";
    pokemonImage.src = image;
    modalCont.innerHTML = "";
    modalCont.appendChild (pokemonImage);
    
}

fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25')
    .then(response => response.json())
    .then(data => {
        const pokemonDiv = document.getElementById("pokemon");
        data.results.map((elemento) => {
            pokemonInformation(elemento.url);
            //pokemonDiv.appendChild(crearElemento(elemento.name, elemento.url));
            //console.log('elemento', elemento.name);
        })
    })
    .catch(error => {
        console.error(error);
    });

// Busca la data de todos los pokemons
const pokemonInformation = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemonDiv = document.getElementById("pokemon");
            const types = data.types;
            pokemonDiv.appendChild (crearElemento(data.name, data.sprites.other.dream_world.front_default, data.id, data.types[0].type.name, data.types[1].type.name));
            })
        .catch(error => {
            console.error(error);
        });
}