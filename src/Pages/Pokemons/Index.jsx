import './styles.css';
import { useState } from 'react';
import { Header } from '../../Components/Header';
import { PokemonSmallCard } from '../../Components/PokemonSmallCard';
import { PokemonDetailsCard } from '../../Components/PokemonDetailsCard';
import { DropDownMenu } from "../../Components/DropDownMenu";
import { PokeNotFound } from "../../Components/PokeNotFound";
import { useEffect } from 'react';
import lupaSVG from '/src/images/lupa.svg';
import { useRef } from 'react';
import { ContentNavigator } from "../../Components/ContentNavigator";

export function Pokemons()
{
    const [allPokemonList, setAllPokemonList] = useState();
    const [allPokemonListByType, setAllPokemonListByType] = useState({});
    const [featuredPokemon, setFeaturedPokemon] = useState();
    const [pokemonsTypes, setPokemonsTypes] = useState([]);
    const [showPokeDetails, setShowPokeDetails] = useState(false);
    const [pokemonsList, setPokemonsList] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const [pokemonPoolList, setPokemonPoolList] = useState();
    const [pokemonDataPos, setPokemonDataPos] = useState(1);
    const lastSearchPromise = useRef(0);
    const [isNotFirstRenderRun, setIsNotFirstRenderRun] = useState(false);

    useEffect(() =>
    {
        async function getPokemonTypes()
        {
            let data = await getData("https://pokeapi.co/api/v2/type/");
            setPokemonsTypes(data.results);
        }
        async function getAllPokemons()
        {
            let data = await getData("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1400");
            setIsDataFetched(true);
            setAllPokemonList(data.results);
        }
        getAllPokemons();
        getPokemonTypes();
        setIsNotFirstRenderRun(true);
        /* On UnRender/UnMount
        return () =>
        {
            console.log("Render OFF")
        }*/

    }, []);

    useEffect(() =>
    {
        if (isDataFetched) 
        {
            setPokemonPoolList(allPokemonList);
        }
        //searchHandle(document.getElementById("searchInput").value);
    }, [allPokemonList]);

    useEffect(() =>
    {
        if (isDataFetched) 
        {
            getPokemonData();
        }

    }, [pokemonPoolList]);

    useEffect(() =>
    {
        if (isNotFirstRenderRun) 
        {
            getPokemonData();
        }

    }, [pokemonDataPos]);

    useEffect(() =>
    {
        if (isNotFirstRenderRun) 
        {
            searchHandle(document.getElementById("searchInput").value);
        }

    }, [allPokemonListByType]);

    async function searchHandle(searchTerm)
    {
        //3 tipos de chamada, pesquisa na barra, reset da barra e pesquisa de categoria
        setPokemonDataPos(1);
        let pokeListSearchPool = [];
        let verifyPromise;

        if ((searchTerm != null && searchTerm != "") || Object.keys(allPokemonListByType).length > 0) 
        {
            let pokeTypesPickCount = Object.keys(allPokemonListByType).length;
            if (pokeTypesPickCount > 0) 
            {
                if (pokeTypesPickCount > 2)
                {
                    pokeListSearchPool = [];
                    setPokemonsList([]);
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
                        if (firstPoke.pokemon.name.includes(searchTerm.toLowerCase())) 
                        {
                            if (pokeTypesPickCount == 2) 
                            {
                                allPokemonListByType[Object.keys(allPokemonListByType)[1]].map(secondPoke => 
                                {
                                    if (firstPoke.pokemon.name == secondPoke.pokemon.name) 
                                    {
                                        pokeListSearchPool.push(firstPoke.pokemon);
                                    }
                                });
                            }
                            else
                            {
                                pokeListSearchPool.push(firstPoke.pokemon);
                            }
                        }
                    });
                }
            }
            else
            {
                allPokemonList.map(value =>
                {
                    if (value.name.includes(searchTerm.toLowerCase()))
                    {
                        pokeListSearchPool.push(value);
                    }
                });

            }
            setPokemonPoolList(pokeListSearchPool);
        }
        else
        {
            setPokemonPoolList(allPokemonList);
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
        pokemonsList.some(value =>
        {
            if (value.id == pokeId) 
            {
                setFeaturedPokemon(value);
                setShowPokeDetails(true);
                return true;
            }
        });
    }
    function fowardContent() 
    {
        if (pokemonPoolList.length - (15 * pokemonDataPos) > 0) 
        {
            setPokemonDataPos(prevState => prevState + 1);
        }
    }
    function backwardContent() 
    {
        if (pokemonDataPos > 1) 
        {
            setPokemonDataPos(prevState => prevState - 1);
        }
    }
    async function getPokemonData()
    {
        lastSearchPromise.current = lastSearchPromise.current + 1;
        let verify = lastSearchPromise.current;

        let avaiablePokemons = pokemonPoolList.length - pokemonDataPos * 15 >= 0 ? 15 : pokemonPoolList.length - (pokemonDataPos - 1) * 15;
        let startPos = (pokemonDataPos - 1) * 15;
        let finalPos = (pokemonDataPos - 1) * 15 + avaiablePokemons;
        let newPokeList = [];

        for (let index = startPos; index < finalPos; index++) 
        {
            let pokeData;
            pokeData = await getData(pokemonPoolList[index].url);
            newPokeList.push(pokeData);
        }

        if (lastSearchPromise.current == verify)
        {
            setPokemonsList(newPokeList);
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
                    <DropDownMenu key="typePokemonMenu" menuLabel="Tipo" options={pokemonsTypes.length > 1 ? pokemonsTypes : [" --- "]} setAllPokemonListByType={setAllPokemonListByType} />
                    <DropDownMenu key="atackPokemonMenu" menuLabel="Ataque" options={false ? pokemonsTypes : [" --- "]} setAllPokemonListByType={setAllPokemonListByType} />
                    <DropDownMenu key="defensePokemonMenu" menuLabel="Defesa" options={false ? pokemonsTypes : [" --- "]} setAllPokemonListByType={setAllPokemonListByType} />
                </div>
                <div className="pokemonsListBox">
                    {
                        isDataFetched ? (pokemonsList.length > 0 ? pokemonsList.map(value => <PokemonSmallCard key={value.name + value.id} pokemonId={value.id} pokemonName={value.name} pokemonTypes={value.types} image={value.sprites.other["official-artwork"].front_default} expandDetails={expandDetails} />) : <PokeNotFound />) : <PokeNotFound />
                    }
                </div>
                {
                    showPokeDetails ? <PokemonDetailsCard pokeData={featuredPokemon} setShowPokeDetails={setShowPokeDetails} /> : ""
                }
                <ContentNavigator pageNumber={pokemonDataPos} fowardContent={fowardContent} backwardContent={backwardContent} />
            </section>
        </section>
    )
}
