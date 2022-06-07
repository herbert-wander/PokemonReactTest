import { useState } from 'react';
import { useEffect } from 'react'
import './styles.css';
import { Header } from '../../Components/Header'

export function Home()
{
    const [membersList, setMembersList] = useState([]);
    const [listOwner, setListOwner] = useState([]);

    useEffect(() =>
    {
        fetch('https://api.github.com/users/herbert-wander')
            .then(response => response.json())
            .then(data =>
            {
                setListOwner(
                    {
                        name: data.name,
                        imgUrl: data.avatar_url
                    })
            })
    }, []);

    function handleAddMember(namesP)
    {
        var newMember = {
            name: namesP,
            time: new Date().toLocaleTimeString("pt-br", { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
        setMembersList(prevState => [...prevState, newMember]);
    }
    return (
        <section id="page">
            <Header />
            <section id="homePage">
                <div className="presentationBox">
                    <h1>Qual pokemon<br /><span className="yellowHighLight">você escolheria?</span></h1>
                    <p>Você pode saber o tipo de Pokémon, seus pontos fortes, fracos e habilidades.</p>
                    <button>Veja os pokemons</button>
                </div>
                <img src="./src/images/banner.svg" alt="Pokemon Banner" className="banner" />
            </section>
        </section>

        /*<div className="container">
            <div className="flexCenterBetween header">
                {<h1>Lista de Presença </h1><ListOwnerHeader name={listOwner.name} imgUrl={listOwner.imgUrl} /> }
            </div>

            <input type="text" placeholder="Digite um Nome Aqui" />
            <button type="button" onClick={e => handleAddMember(e.target.previousSibling.value)}>Adicionar</button>
            {
                //membersList.map(member => <ListItemCard key={member.time} name={member.name} time={member.time} />)
            }
        </div>*/

    )
}
