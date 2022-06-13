import './styles.css';
import { useEffect } from 'react';
import { useState } from 'react';

export function PokemonDetailsCard({ pokeData, setShowPokeDetails })
{
    const [pokeDesc, setPokeDesc] = useState();
    useEffect(() =>
    {
        getPokeDescription();
    }, []);
    function formatId(pokeId)
    {
        var formatedId = pokeId;
        for (let index = 0; index < 3 - pokeId.length; index++) 
        {
            formatedId = "0" + formatedId;
        }
        return "#" + formatedId;
    }
    async function getPokeDescription()
    {
        await fetch(pokeData.species.url)
            .then(data => data.json())
            .then(data => 
            {
                setPokeDesc(data.flavor_text_entries[0].flavor_text.replace("\n", " ").replace("\f", " ") + data.flavor_text_entries[3].flavor_text.replace("\n", " ").replace("\f", " "));
            })
            .catch(error => console.log("Error = " + error));
    }

    return (
        <div className="modalPokeDetails">
            <div className="pokeDetailsCard">
                <div className="closeModal" onClick={() => setShowPokeDetails()} ><span>X</span></div>
                <div className="pokeDetailsBox">
                    <div className="pokeProfileBox">
                        <img src={pokeData.sprites.other["official-artwork"].front_default} alt="" />
                        <div className="pokeDetailsTypesBox">
                            {
                                pokeData.types.map((value) => <div className="pokeDetailsType" key={"pokeDetailType" + pokeData.id + value.type.name}>{value.type.name}</div>)
                            }
                        </div>
                    </div>
                    <div className="pokeInfoBox">
                        <div className="pokeInfoTitle">
                            <h1>{pokeData.name}</h1>
                            <span>{formatId(pokeData.id.toString())}</span>
                        </div>
                        <p className="pokeInfoDesc">{pokeDesc}</p>
                        <div className="pokeBaseInfosBox">
                            <div className="pokeBaseinfoBox">
                                <img src="/src/images/peso.svg" alt="" />
                                <div className="pokeBaseinfoDetail">
                                    <span className="pokeBaseInfoTitle">{(pokeData.weight * 100) / 1000} kg</span>
                                    <span className="pokeInfoSmallDetail">peso</span>
                                </div>
                            </div>
                            <div className="pokeBaseinfoBox">
                                <img src="/src/images/regua.svg" alt="" />
                                <div className="pokeBaseinfoDetail">
                                    <span className="pokeBaseInfoTitle">{(pokeData.height * 10) / 100} m</span>
                                    <span className="pokeInfoSmallDetail">altura</span>
                                </div>
                            </div>
                            <div className="pokeBaseinfoBox mainPowerBox">
                                <span className="pokeBaseInfoTitle">{pokeData.abilities[0].ability.name}</span>
                                <span className="pokeInfoSmallDetail">Poder Principal</span>
                            </div>
                        </div>
                        <div className="pokeStatsInfoBox">
                            <div className="pokeStatInfoBox">
                                <span className="pokeStatInfoLabel">Ataque</span>
                                <span className="pokeStatInfoValue">{pokeData.stats[1].base_stat}</span>
                                <span className="pokeStatInfoBar"></span>
                            </div>
                            <div className="pokeStatInfoBox">
                                <span className="pokeStatInfoLabel">Defesa</span>
                                <span className="pokeStatInfoValue">{pokeData.stats[2].base_stat}</span>
                                <span className="pokeStatInfoBar"></span>
                            </div>
                            <div className="pokeStatInfoBox">
                                <span className="pokeStatInfoLabel">Vl. Ataque</span>
                                <span className="pokeStatInfoValue">{pokeData.stats[5].base_stat}</span>
                                <span className="pokeStatInfoBar"></span>
                            </div>
                            <div className="pokeStatInfoBox">
                                <span className="pokeStatInfoLabel">Total</span>
                                <span className="pokeStatInfoValue">{pokeData.stats[1].base_stat + pokeData.stats[2].base_stat + pokeData.stats[5].base_stat}</span>
                                <span className="pokeStatInfoBar"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}