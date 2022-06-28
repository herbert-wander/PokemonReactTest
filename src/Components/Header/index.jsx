import './styles.css';
import pokemonLogoSVG from '/src/images/pokemonLogo.svg';

export function Header({ setPageNavigation, pageSelected })
{
    return (
        <nav>
            <img src={pokemonLogoSVG} alt="Pokemon Logo" />
            <ul>
                <li><a href="#" className={pageSelected == 1 ? "selectedNavBar" : ""} onClick={() => setPageNavigation(1)}>home</a></li>
                <li><a href="#" className={pageSelected == 2 ? "selectedNavBar" : ""} onClick={() => setPageNavigation(2)}>pokemons</a></li>
                <li><a href="#" /*className={pageSelected == 3 ? "selectedNavBar" : ""} onClick={() => setPageNavigation(3)}*/>contato</a></li>
            </ul>
        </nav>
    );
}