import './styles.css';
import { useState } from 'react';
import { Header } from '../../Components/Header';
import { PokemonSmallCard } from '../../Components/PokemonSmallCard';
import { PokemonDetailsCard } from '../../Components/PokemonDetailsCard';

export function Pokemons()
{
    const [pokemonsList, setPokemonsList] = useState([]);
    return (
        <section id="page">
            <Header />
            <section id="pokemonPage">
                <h1>Mais de 250 Pokemons para você escolher o seu favorito</h1>
                <div className="searchBar">
                    <input type="text" placeholder="Pesquisar pokemon" />
                    <img src="" alt="" />
                </div>
                <div className="containerCenter">
                    <div className="pokemonsListBox">
                        <PokemonSmallCard />
                        <PokemonSmallCard />
                        {/* {
                            pokemonsList.map(member => <PokemonSmallCard key={member.time} name={member.name} time={member.time} />)
                        } */}
                    </div>
                </div>
            </section>
        </section>
    )
}
