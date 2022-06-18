import './styles.css';
import pokemonLogoSVG from '/src/images/pokemonLogo.svg';
import { useState } from 'react';
import { useRef } from 'react';

export function ContentNavigator({ pageNumber, fowardContent, backwardContent })
{
    return (
        <div className="contentNavigator">
            <div onClick={() => backwardContent()}>&#60;</div>
            <div>{pageNumber}</div>
            <div onClick={() => fowardContent()}>&#62;</div>
        </div>
    );
}