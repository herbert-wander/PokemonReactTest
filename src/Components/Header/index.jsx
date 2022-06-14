import './styles.css';
import pokemonLogoSVG from '/src/images/pokemonLogo.svg';

export function Header({ setPageNavigation })
{
    return (
        <nav>
            <img src={pokemonLogoSVG} alt="Pokemon Logo" />
            <ul>
                <li><a href="#" className="selectNavBar" onClick={() => setPageNavigation(1)}>home</a></li>
                <li><a href="#" onClick={() => setPageNavigation(2)}>pokemons</a></li>
                <li><a href="#">contato</a></li>
            </ul>
        </nav>
    );
}