import './styles.css'
export function Header()
{
    return (
        <nav>
            <img src="./src/images/pokemonLogo.svg" alt="Pokemon Logo" />
            <ul>
                <li><a href="" className="selectNavBar">home</a></li>
                <li><a href="">pokemons</a></li>
                <li><a href="">contato</a></li>
            </ul>
        </nav>
    );
}