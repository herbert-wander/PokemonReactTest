import './styles.css';
import { useState } from 'react';
import { Header } from '../../Components/Header';
import { PokemonSmallCard } from '../../Components/PokemonSmallCard';
import { PokemonDetailsCard } from '../../Components/PokemonDetailsCard';
import { DropDownMenu } from "../../Components/DropDownMenu";
import { PokeNotFound } from "../../Components/PokeNotFound";
import { useEffect } from 'react';
import lupaSVG from '/src/images/lupa.svg'
import { useRef } from 'react'
import { ContentNavigator } from "../../Components/ContentNavigator";

export function Pokemons()
{
    const [pokemonsList, setPokemonsList] = useState({});
    const [defaultPokeList, setDefaultPokeList] = useState({});
    const [pokemonsTypes, setPokemonsTypes] = useState([]);
    const [showPokeDetails, setShowPokeDetails] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [pokemontDataPos, setPokemontDataPos] = useState(1);
    const [allPokemonList, setAllPokemonList] = useState();
    const [allPokemonListByType, setAllPokemonListByType] = useState({});
    const [featuredPokemon, setFeaturedPokemon] = useState();
    const lastSearchPromise = useRef();
    const pokePagePos = useRef(1);

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
            setIsDataFetched(true);

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
        setPokemontDataPos(1);
        let searchResult = {};
        if ((searchTerm != null && searchTerm != "") || Object.keys(allPokemonListByType).length > 0) 
        {
            let verifyPromise;
            let pokeData;
            let pokemonListPool = {};
            let pokeTypesPickCount = Object.keys(allPokemonListByType).length;
            if (pokeTypesPickCount > 0) 
            {
                if (pokeTypesPickCount > 2)
                {
                    pokemonListPool = [];
                    setPokemonsList({});
                }
                else
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
                    }
                    ));
                    const response = await verifyPromise;
                    allPokemonListByType[Object.keys(allPokemonListByType)[0]].map(firstPoke => 
                    {
                        if (pokeTypesPickCount == 2) 
                        {
                            if (firstPoke.pokemon.name.includes(searchTerm.toLowerCase())) 
                            {
                                allPokemonListByType[Object.keys(allPokemonListByType)[1]].map(secondPoke => 
                                {
                                    if (firstPoke.pokemon.name == secondPoke.pokemon.name) 
                                    {
                                        pokemonListPool[firstPoke.pokemon.name] = firstPoke.pokemon;
                                    }
                                }
                                );
                            }
                        }
                        else
                        {
                            if (firstPoke.pokemon.name.includes(searchTerm.toLowerCase())) 
                            {
                                pokemonListPool[firstPoke.pokemon.name] = firstPoke.pokemon;
                            }
                        }
                    }
                    );
                }
            }
            else
            {
                allPokemonList.map(value =>
                {
                    if (value.name.includes(searchTerm.toLowerCase()))
                    {
                        pokemonListPool[value.name] = value;
                    }
                }
                );

            }
            verifyPromise = Promise.all(Object.entries(pokemonListPool).map(async ([key, value]) =>
            {
                if (value.name.includes(searchTerm.toLowerCase())) 
                {
                    pokeData = await getData(value.url);
                    searchResult[pokeData.id] = pokeData;
                }
            }));

            lastSearchPromise.current = verifyPromise;;
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
    function pokeCardsPagination() 
    {
        if (isDataFetched) 
        {
            let pokeList = Object.entries(pokemonsList);
            let cardsComponents = [];
            let maxList = pokeList.length - pokemontDataPos * 15 >= 0 ? 15 : pokeList.length - (pokemontDataPos - 1) * 15;
            //console.log(maxList + " || " + pokeList.length + " || " + (pokemontDataPos - 1) * 15 + " || " + ((pokemontDataPos - 1) * 15 + maxList));
            for (let index = (pokemontDataPos - 1) * 15; index < (pokemontDataPos - 1) * 15 + maxList; index++) 
            {
                cardsComponents.push(<PokemonSmallCard key={pokeList[index][0]} pokemonId={pokeList[index][0]} pokemonName={pokeList[index][1].name} pokemonTypes={pokeList[index][1].types} image={pokeList[index][1].sprites.other["official-artwork"].front_default} expandDetails={expandDetails} />);
            }
            return cardsComponents;
        }
        return null;
    }
    function fowardContent() 
    {
        let pokeListSize = Object.entries(pokemonsList).length;
        if (pokeListSize - 15 * pokemontDataPos > 0) 
        {
            setPokemontDataPos(prevState => prevState + 1);
        }
    }
    function backwardContent() 
    {
        if (pokemontDataPos > 1) 
        {
            setPokemontDataPos(prevState => prevState - 1);
        }
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
                    <DropDownMenu key="atackPokemonMenu" menuLabel="Ataque" options={false ? pokemonsTypes : [" --- "]} setAllPokemonListByType={setAllPokemonListByType} />
                    <DropDownMenu key="defensePokemonMenu" menuLabel="Defesa" options={false ? pokemonsTypes : [" --- "]} setAllPokemonListByType={setAllPokemonListByType} />
                </div>
                <div className="pokemonsListBox">
                    {
                        Object.entries(pokemonsList).length == 0 ? <PokeNotFound /> : isDataFetched ? pokeCardsPagination() : null
                    }
                </div>
                {
                    showPokeDetails ? <PokemonDetailsCard pokeData={featuredPokemon} setShowPokeDetails={setShowPokeDetails} /> : ""
                }
                <ContentNavigator pageNumber={pokemontDataPos} fowardContent={fowardContent} backwardContent={backwardContent} />
            </section>
        </section>
    )
}
