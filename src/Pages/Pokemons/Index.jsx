import './styles.css';
import { useState } from 'react';
import { Header } from '../../Components/Header';
import { PokemonSmallCard } from '../../Components/PokemonSmallCard';
import { PokemonDetailsCard } from '../../Components/PokemonDetailsCard';
import { DropDownMenu } from "../../Components/DropDownMenu";
import { useEffect } from 'react';

export function Pokemons()
{
    const [pokemonsList, setPokemonsList] = useState({});
    const [defaultPokeList, setDefaultPokeList] = useState({});
    const [pokemonsTypes, setPokemonsTypes] = useState([]);
    const [pokemontDataPos, setPokemontDataPos] = useState(1);
    const [allPokemonList, setAllPokemonList] = useState(1);

    useEffect(() =>
    {
        async function getPokemonData()
        {
            for (let index = pokemontDataPos; index < pokemontDataPos + 15; index++) 
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
                        setDefaultPokeList(prevState =>
                        {
                            prevState[data.id] = data;
                            return { ...prevState };
                        });
                    });
            }

        }
        async function getPokemonTypes()
        {
            await fetch("https://pokeapi.co/api/v2/type/")
                .then(data => data.json())
                .then(data => 
                {
                    //console.log(data.results);
                    setPokemonsTypes(data.results);
                })
                .catch(error => console.log("Error = " + error));
        }
        async function getAllPokemons()
        {
            await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1400")
                .then(data => data.json())
                .then(data => 
                {
                    setAllPokemonList(data.results);
                })
                .catch(error => console.log("Error = " + error));
        }
        getAllPokemons();
        getPokemonTypes();
        getPokemonData();

    }, []);
    async function searchHandle(searchTerm)
    {
        var searchResult = {};
        if (searchTerm != null && searchTerm != "") 
        {
            await Promise.all(allPokemonList.map(async (value) =>
            {
                if (value.name.includes(searchTerm.toLowerCase())) 
                {
                    var pokeData = await getData(value.url);
                    searchResult[pokeData.id] = pokeData;
                }
            }));
            setPokemonsList(searchResult);
        }
        else
        {
            setPokemonsList(defaultPokeList);
        }

    }
    async function getData(url) 
    {
        return fetch(url)
            .then(data => data.json())
            .then(data => 
            {
                return data;
            })
            .catch(error => console.log("Error = " + error));
    }
    function checkForImage(pokeSprites) 
    {
        if (pokeSprites.other.dream_world.front_default == null) 
        {
            return pokeSprites.other["official-artwork"].front_default;
        }
        else
        {
            return pokeSprites.other.dream_world.front_default;
        }
    }

    return (
        <section id="page">
            <Header />
            <section id="pokemonPage">
                <h1>Mais de 900 Pokemons para você escolher o seu favorito</h1>
                <div className="searchBar">
                    <input type="text" placeholder="Pesquisar pokemon" onChange={e => searchHandle(e.target.value)} />
                    <img src="./src/images/lupa.svg" alt="Pesquisar" />
                </div>
                <div className="selectionMenuBox">
                    <DropDownMenu key="typePokemonMenu" menuLabel="Tipo" options={pokemonsTypes.length > 1 ? pokemonsTypes : [" --- "]} />
                    <DropDownMenu key="atackPokemonMenu" menuLabel="Ataque" options={pokemonsTypes.length > 1 ? pokemonsTypes : [" --- "]} />
                    <DropDownMenu key="defensePokemonMenu" menuLabel="Defesa" options={pokemonsTypes.length > 1 ? pokemonsTypes : [" --- "]} />
                </div>
                <div className="pokemonsListBox">
                    {
                        //pokemonsList.map((value, index) => <PokemonSmallCard key={index} pokemonId={index} pokemonName={value.name} pokemonTypes={value.types} image={checkForImage(value.sprites)} />)
                        Object.entries(pokemonsList).map(([key, value]) => <PokemonSmallCard key={key} pokemonId={key} pokemonName={value.name} pokemonTypes={value.types} image={checkForImage(value.sprites)} />)
                    }
                </div>

            </section>
        </section>
    )
}
