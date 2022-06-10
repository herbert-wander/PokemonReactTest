import './styles.css';
import { useState } from 'react';
import { Header } from '../../Components/Header';
import { PokemonSmallCard } from '../../Components/PokemonSmallCard';
import { PokemonDetailsCard } from '../../Components/PokemonDetailsCard';
import { useEffect } from 'react';

export function Pokemons()
{
    const [pokemonsList, setPokemonsList] = useState({});
    const [pokemontDataPos, setPokemontDataPos] = useState(1);

    useEffect(() =>
    {
        async function getPokemonData()
        {
            for (let index = pokemontDataPos; index < pokemontDataPos + 20; index++) 
            {
                var url = "http://pokeapi.co/api/v2/pokemon/" + index;
                await fetch(url)
                    .then(data => data.json())
                    .then(data => 
                    {
                        setPokemonsList(prevState =>
                        {
                            prevState[data.id] = data;
                            return { ...prevState };
                        });
                    });
            }
        }
        getPokemonData();

    }, []);

    return (
        <section id="page">
            <Header />
            <section id="pokemonPage">
                <h1>Mais de 250 Pokemons para você escolher o seu favorito</h1>
                <div className="searchBar">
                    <input type="text" placeholder="Pesquisar pokemon" />
                    <img src="" alt="" />
                </div>

                <div className="pokemonsListBox">
                    {/*"https://pokeapi.co/api/v2/ability/?limit=20&offset=20"*/}
                    {
                        //pokemonsList.map((value, key) =>
                        //{
                        //    <PokemonSmallCard key={key} PokemonId={key} pokemonName={value.name} pokemonTypes={value.types} image={value.sprites.other.dream_world.front_default} />
                        //})
                        Object.entries(pokemonsList).map(([key, value]) => <PokemonSmallCard key={key} pokemonId={key} pokemonName={value.name} pokemonTypes={value.types} image={value.sprites.other.dream_world.front_default} />)
                    }
                </div>

            </section>
        </section>
    )
}
