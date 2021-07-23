import React, { useState } from 'react'
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import "../styles/pages/ranking.css"

function Ranking() {
    
    const [rankingName, setRankingName] = useState("Ranking de Skillpoints")

    const [rankingPlayer, setRankingPlayerName] = useState({
        name:"Usuario do app",
        position: 32,
        points: 123
    });

    const [rankingList,setRankingList] = useState([
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Leonardo de Souza Takehana",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        },
        {
            id:"1",
            profilePicture: null,
            name: "Fulano",
            company:"skillab",
            points:"312 Points",
            email:"teste@email.com"
        }
    ])

    const [backgroundColor,setBackgroundColor] = useState("#C7C7C7");

    return(
        <div className="mainFrame" style={{backgroundColor:backgroundColor}}>
            <Navbar></Navbar>
            <div className="mainBody">
                <Menu selectedMenu={5}></Menu>
                <div className="mainContent">
                    <div className="rankingFrame">
                        <div className="rankingTitle">
                            <span className="material-icons rankingArrow">
                                arrow_back
                            </span>
                            <h1>{rankingName}</h1>
                            <span className="material-icons rankingFilter">
                                filter_alt
                            </span>
                        </div>
                        <div className="rankingList">
                            <table className="rankingTable">
                                {rankingList.map((ranking,index)=>(
                                    <tr>
                                        <td className="rankingIconColumn">
                                            <span className="material-icons rankingIcon">
                                                account_circle
                                            </span>
                                        </td>
                                        <td className="rankingNameColumn">
                                            <label className="rankingName">{ranking.name}</label>
                                        </td>
                                        <td className="rankingPositionColumn">
                                            <label className="rankingPosition">{(index+1)+"º lugar"}</label>
                                        </td>
                                        <td className="rankingPointsColumn">
                                            <label className="rankingPoints">{ranking.points}</label>
                                        </td>
                                        <td className="rankingSymbolColumn">
                                            <span className="material-icons rankingSymbol">
                                                emoji_events
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                    <div className="rankingPlayer">
                        <span className="material-icons rankingPlayerIcon">
                            account_circle
                        </span>
                        <h1 className="rankingPlayerName">{rankingPlayer.name}</h1>
                        <label className="rankingPlayerPosition">{rankingPlayer.position +"º Lugar"}</label>
                        <label className="rankingPlayerPoints">{rankingPlayer.points+" Points"}</label>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Ranking;