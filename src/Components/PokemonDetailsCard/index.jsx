import './styles.css';

export function PokemonDetailsCard()
{
    return (
        <div className="modalPokeDetails">
            <div className="pokeDetailsCard">
                <div className="closeModal"><span>X</span></div>
                <div className="pokeDetailsBox">
                    <div className="pokeProfileBox">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" alt="" />
                        <div className="pokeDetailsTypesBox">
                            <span>Fogo</span>
                        </div>
                    </div>
                    <div className="pokeInfoBox">
                        <div className="pokeInfoTitle">
                            <h1>Charizard</h1>
                            <span>#005</span>
                        </div>
                        <p className="pokeInfoDesc">
                            Charizard é um Pokémon bípede dracônico . É principalmente laranja com uma parte inferior creme do peito até a ponta da cauda.
                        </p>
                        <div className="pokeBaseInfosBox">
                            <div className="pokeBaseinfoBox">
                                <img src="./src/images/peso.svg" alt="" />
                                <div className="pokeBaseinfoDetail">
                                    <span className="pokeBaseInfoTitle">90.5 kg</span>
                                    <span className="pokeInfoSmallDetail">peso</span>
                                </div>
                            </div>
                            <div className="pokeBaseinfoBox">
                                <img src="./src/images/regua.svg" alt="" />
                                <div className="pokeBaseinfoDetail">
                                    <span className="pokeBaseInfoTitle">1.7 m</span>
                                    <span className="pokeInfoSmallDetail">altura</span>
                                </div>
                            </div>
                            <div className="pokeBaseinfoBox mainPowerBox">
                                <span className="pokeBaseInfoTitle">lança Chamas</span>
                                <span className="pokeInfoSmallDetail">Poder Principal</span>
                            </div>
                        </div>
                        <div className="pokeStatsInfoBox">
                            <div className="pokeStatInfoBox">
                                <span className="pokeStatInfoLabel">Ataque</span>
                                <span className="pokeStatInfoValue">84</span>
                                <span className="pokeStatInfoBar"></span>
                            </div>
                            <div className="pokeStatInfoBox">
                                <span className="pokeStatInfoLabel">Defesa</span>
                                <span className="pokeStatInfoValue">78</span>
                                <span className="pokeStatInfoBar"></span>
                            </div>
                            <div className="pokeStatInfoBox">
                                <span className="pokeStatInfoLabel">Vl. Ataque</span>
                                <span className="pokeStatInfoValue">109</span>
                                <span className="pokeStatInfoBar"></span>
                            </div>
                            <div className="pokeStatInfoBox">
                                <span className="pokeStatInfoLabel">Total</span>
                                <span className="pokeStatInfoValue">271</span>
                                <span className="pokeStatInfoBar"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}