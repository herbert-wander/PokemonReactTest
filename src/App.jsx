import { Home } from './Pages/Home';
import { Pokemons } from "./Pages/Pokemons/Index";
import { Header } from "./Components/Header";
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import "./styles/global.css"
import "./styles/variables.css"

export function App()
{
    const [pageState, setPageState] = useState(1);

    function navigationHandle()
    {
        //Id 1 = Home || Id 2 = Pokemon Page
        if (pageState == 1) 
        {
            return <Home setPageNavigation={setPageNavigation} />;
        }
        else if (pageState == 2)
        {
            return <Pokemons />;
        }
        else
        {
            return <Home setPageNavigation={setPageNavigation} />;
        }
    }
    function setPageNavigation(pageId) 
    {
        setPageState(pageId);
    }
    return (
        <div>
            <Header setPageNavigation={setPageNavigation} />
            {
                navigationHandle()
            }
        </div>

    )
}
