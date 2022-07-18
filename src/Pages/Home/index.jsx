import './styles.css';
import bannerSVG from '/src/images/banner.svg';
import { PresentationTextCard } from "../../Components/PresentationTextCard";

export function Home({ setPageNavigation })
{
    return (
        <section id="page">
            <section id="homePage">
                <div className="presentationBox">
                    <PresentationTextCard isCaseSense={false} titleText="Qual pokemon você escolheria?" highlightTerm="escolheria" highLightAll={true} textContent="Você pode saber o tipo de Pokémon, seus pontos fortes, fracos e habilidades." />
                    <button onClick={() => setPageNavigation(2)} >Veja os pokemons</button>
                </div>
                <img src={bannerSVG} alt="Pokemon Banner" className="banner" />
            </section>
        </section>
    )
}
