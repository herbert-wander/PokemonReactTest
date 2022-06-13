import './styles.css';

export function PokemonSmallCard({ pokemonId, pokemonName, pokemonTypes, image, expandDetails })
{
    function printTypes(pokemonIdP, pokemonTypesP)
    {
        return pokemonIdP + pokemonTypesP;
    }
    function formatId()
    {
        var formatedId = pokemonId;
        for (let index = 0; index < 3 - pokemonId.length; index++) 
        {
            formatedId = "0" + formatedId;
        }
        return "#" + formatedId;
    }
    return (
        <div className="pokemonCard" onClick={() => expandDetails(pokemonId)}>
            <span className="pokemonId">{formatId()}</span>
            <h3>{pokemonName}</h3>
            {
                pokemonTypes.map((value) => <span key={printTypes(pokemonId, value.type.name)} className="pokemonType">{value.type.name}</span>)
            }
            <img src={image} alt="" />
        </div>
    )
}
