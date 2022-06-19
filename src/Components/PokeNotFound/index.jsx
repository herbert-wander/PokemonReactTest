import './styles.css';
import { useEffect } from 'react';
import { useState } from 'react';
import pokeNotFoundPNG from '/src/images/pokeNotFound.png';

export function PokeNotFound()
{
    return (
        <div className="pokeNotFound">
            <span>Pokémon não encontrado, lembre que Pokémons podem ter no <strong>máximo</strong> 2 tipos.</span>
            <img src={pokeNotFoundPNG} alt="" />
        </div>
    )
}