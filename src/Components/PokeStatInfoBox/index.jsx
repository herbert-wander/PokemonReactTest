import './styles.css';
import pokemonLogoSVG from '/src/images/pokemonLogo.svg';
import { useState } from 'react';
import { useRef } from 'react';

export function PokeStatInfoBox({ label, statValue, statMax })
{
    //Average Atack 90 || Average Defense 83 || Average Speed 78 || Average Total 251
    function convertStatToWidth() 
    {
        let result = (parseInt(statValue) / parseInt(statMax)) * 100
        if (result > 100) 
        {
            return "100%";
        }
        return result + "%";
    }

    return (
        <div className="pokeStatInfoBox">
            <span className="pokeStatInfoLabel">{label}</span>
            <span className="pokeStatInfoValue">{statValue}</span>
            <span className="pokeStatInfoBar"><div className="statValueFill" style={{ "width": convertStatToWidth() }}></div></span>
        </div>
    );
}