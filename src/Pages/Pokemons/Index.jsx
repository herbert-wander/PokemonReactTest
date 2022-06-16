import './styles.css';
import { useState } from 'react';
import { Header } from '../../Components/Header';
import { PokemonSmallCard } from '../../Components/PokemonSmallCard';
import { PokemonDetailsCard } from '../../Components/PokemonDetailsCard';
import { DropDownMenu } from "../../Components/DropDownMenu";
import { useEffect } from 'react';
import lupaSVG from '/src/images/lupa.svg'
import { useRef } from 'react'

export function Pokemons()
{
    const [pokemonsList, setPokemonsList] = useState({});
    const [defaultPokeList, setDefaultPokeList] = useState({});
    const [pokemonsTypes, setPokemonsTypes] = useState([]);
    const [showPokeDetails, setShowPokeDetails] = useState(false);
    const [pokemontDataPos, setPokemontDataPos] = useState(1);
    const [allPokemonList, setAllPokemonList] = useState();
    const [allPokemonListByType, setAllPokemonListByType] = useState({});
    const [featuredPokemon, setFeaturedPokemon] = useState();
    const lastSearchPromise = useRef();

    useEffect(() =>
    {
        async function getPokemonData()
        {
            for (let index = pokemontDataPos; index < pokemontDataPos + 15; index++) 
            {
                let url = "https://pokeapi.co/api/v2/pokemon/" + index;
                let data = await getData(url);
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

            }

        }
        async function getPokemonTypes()
        {
            let data = await getData("https://pokeapi.co/api/v2/type/");
            setPokemonsTypes(data.results);
        }
        async function getAllPokemons()
        {
            let data = await getData("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1400")
            setAllPokemonList(data.results);
        }
        getAllPokemons();
        getPokemonTypes();
        getPokemonData();

    }, []);

    useEffect(() =>
    {
        searchHandle(document.getElementById("searchInput").value);
    }, [allPokemonListByType]);

    async function searchHandle(searchTerm)
    {
        //3 tipos de chamada, pesquisa na barra, reset da barra e pesquisa de categoria
        let searchResult = {};
        if ((searchTerm != null && searchTerm != "") || Object.keys(allPokemonListByType).length > 0) 
        {
            let verifyPromise;
            let pokeData;
            let pokemonListPool = [];
            if (Object.keys(allPokemonListByType).length > 0) 
            {
                verifyPromise = Promise.all(Object.entries(allPokemonListByType).map(async ([key, value]) =>
                {
                    if (value == null) 
                    {
                        allPokemonListByType[key] = (await getData("https://pokeapi.co/api/v2/type/" + key)).pokemon;
                    }
                    else
                    {
                        console.log("Cached Already!");
                    }
                    pokemonListPool = [...allPokemonListByType[key], ...pokemonListPool];

                }
                ));
                const response = await verifyPromise;
            }
            if (pokemonListPool == null) 
            {
                pokemonListPool = [...allPokemonList];
            }
            //console.log(pokemonListPool);
            verifyPromise = Promise.all(pokemonListPool.map(async (value) =>
            {
                let name, url;
                if (Object.hasOwn(value, "pokemon")) 
                {
                    name = value.pokemon.name;
                    url = value.pokemon.url;
                }
                else
                {
                    name = value.name;
                    url = value.url;
                }
                if (name.includes(searchTerm.toLowerCase())) 
                {
                    pokeData = await getData(url);
                    searchResult[pokeData.id] = pokeData;
                }
            }));

            lastSearchPromise.current = verifyPromise;
            const response = await verifyPromise;
            if (lastSearchPromise.current == verifyPromise)
            {
                setPokemonsList(searchResult);
            }

        }
        else
        {
            lastSearchPromise.current = null;
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
    function expandDetails(pokeId)
    {
        setFeaturedPokemon(pokemonsList[pokeId]);
        setShowPokeDetails(true);

    }

    return (
        <section id="page">
            <section id="pokemonPage">
                <h1 className="pokePageTitle">Mais de 900 Pokemons para você escolher o seu favorito</h1>
                <div className="searchBar">
                    <input id="searchInput" type="text" placeholder="Pesquisar pokemon" onChange={e => searchHandle(e.target.value)} />
                    <img src={lupaSVG} alt="Pesquisar" />
                </div>
                <div className="selectionMenuBox">
                    <DropDownMenu key="typePokemonMenu" menuLabel="Tipo" options={pokemonsTypes.length > 1 ? pokemonsTypes : [" --- "]} setAllPokemonListByType={setAllPokemonListByType} searchHandle={searchHandle} />
                    <DropDownMenu key="atackPokemonMenu" menuLabel="Ataque" options={pokemonsTypes.length > 1 ? pokemonsTypes : [" --- "]} setAllPokemonListByType={setAllPokemonListByType} />
                    <DropDownMenu key="defensePokemonMenu" menuLabel="Defesa" options={pokemonsTypes.length > 1 ? pokemonsTypes : [" --- "]} setAllPokemonListByType={setAllPokemonListByType} />
                </div>
                <div className="pokemonsListBox">
                    {
                        Object.entries(pokemonsList).map(([key, value]) => <PokemonSmallCard key={key} pokemonId={key} pokemonName={value.name} pokemonTypes={value.types} image={value.sprites.other["official-artwork"].front_default} expandDetails={expandDetails} />)
                    }
                </div>
                {
                    showPokeDetails ? <PokemonDetailsCard pokeData={featuredPokemon} setShowPokeDetails={setShowPokeDetails} /> : ""
                }
            </section>
        </section>
    )
}
