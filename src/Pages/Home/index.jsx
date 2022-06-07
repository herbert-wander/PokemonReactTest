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
            <section></section>
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
