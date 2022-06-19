import { useState } from 'react';
import { useEffect } from 'react';
import './styles.css';
import bannerSVG from '/src/images/banner.svg';
import { Header } from '../../Components/Header';

export function Home({ setPageNavigation })
{
    return (
        <section id="page">
            <section id="homePage">
                <div className="presentationBox">
                    <h1>Qual pokemon<br /><span className="yellowHighLight">você escolheria?</span></h1>
                    <p>Você pode saber o tipo de Pokémon, seus pontos fortes, fracos e habilidades.</p>
                    <button onClick={() => setPageNavigation(2)} >Veja os pokemons</button>
                </div>
                <img src={bannerSVG} alt="Pokemon Banner" className="banner" />
            </section>
        </section>
    )
}
