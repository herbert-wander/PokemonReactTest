import './styles.css'
export function Header({ setPageNavigation })
{
    return (
        <nav>
            <img src="/src/images/pokemonLogo.svg" alt="Pokemon Logo" />
            <ul>
                <li><a href="#" className="selectNavBar" onClick={() => setPageNavigation(1)}>home</a></li>
                <li><a href="#" onClick={() => setPageNavigation(2)}>pokemons</a></li>
                <li><a href="#">contato</a></li>
            </ul>
        </nav>
    );
}