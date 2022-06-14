import './styles.css';
import pokemonLogoSVG from '/src/images/pokemonLogo.svg';
import { useState } from 'react';
import { useRef } from 'react';

export function Header({ setPageNavigation })
{
    const [selectedNav, setSelectedNav] = useState();
    const currentSelected = useRef();

    function setPage(pageId, element) 
    {
        if (currentSelected.current != null) 
        {
            currentSelected.current.className = "";
        }
        element.target.className = "selectedNavBar";
        currentSelected.current = element.target;
        setSelectedNav(element.target.innerHTML);
        setPageNavigation(pageId);
    }
    return (
        <nav>
            <img src={pokemonLogoSVG} alt="Pokemon Logo" />
            <ul>
                <li><a href="#" className={""} onClick={e => setPage(1, e)}>home</a></li>
                <li><a href="#" className={""} onClick={e => setPage(2, e)}>pokemons</a></li>
                <li><a href="#">contato</a></li>
            </ul>
        </nav>
    );
}