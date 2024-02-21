const pokemonList = document.getElementById('pokemonList')
const pokemon = document.getElementById('pokemon')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {

    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    <li id="${pokemon.name}-click" class="type pokeclick">Mais Informações</li>
                </ol>
                
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        pokemons.map(pokemon => {
            const pokeMore = document.getElementById(pokemon.name+'-click')
            pokeMore.addEventListener('click', () => {
                console.log(pokemon)
                var text =`
                <span class="close">&times;</span>
                <img class="pokemonImg" src="${pokemon.photo}"
                alt="${pokemon.name}">
                <p class="pokemonNome">${(pokemon.name)}</p>
                ${pokemon.types.map((type) => `<p class="modalType ${type}">${type}</p>`).join('')}`

                const myModalInterno = document.getElementById("myModal-interno");
                myModalInterno.innerHTML = ''
                myModalInterno.innerHTML += text;
                // Obtém o modal
                var modal = document.getElementById("myModal");
                // Obtém o elemento <span> que fecha o modal
                var span = document.getElementsByClassName("close")[0];
                // Quando o usuário clica no botão, abre o modal
                modal.style.display = "block";
                // Quando o usuário clica no <span> (x), fecha o modal


                span.onclick = function() {
                    modal.style.display = "none";
                    }

                    window.onclick = function(event) {
                        if (event.target == modal) {
                          modal.style.display = "none";
                        }
                      }
            })
        })

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})



