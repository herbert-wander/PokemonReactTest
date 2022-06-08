import './styles.css';

export function PokemonSmallCard({ pokemonId, pokemonName, pokemonTypes, image })
{
    return (
        <div className="pokemonCard">
            <span className="pokemonId">#001</span>
            <h3>Bulbassaur</h3>
            <span className="pokemonType">Planta</span>
            <span className="pokemonType">Venenoso</span>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg" alt="" />
        </div>
    )
}
