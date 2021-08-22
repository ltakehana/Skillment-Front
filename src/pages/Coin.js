import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom';
import "../styles/pages/coins.css";
import getCoin from '../services/requests/getCoin';
import getCompany from '../services/requests/getCompany';
import defaultImage from "../assets/coinIcon.svg";
import externalLinks from '../utils/externalLinks';

function Coin(props) {

    const history = useHistory();

    const coinId = props.match.params.coinId;

    const [coins,setCoins] = useState([]);
    const [coinSelected,setCoinSelected]=useState([]);
    const [backgroundColor,setBackgroundColor] = useState("#C7C7C7");

    useEffect(async ()=>{
        const userToken=sessionStorage.getItem("userToken");
        if(!userToken){
            await history.push("/login")
        }
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if(!companyInfo){
            companyInfo = await getCompany(userToken);
        }
        setBackgroundColor(companyInfo.second_color);
        const coins = await getCoin(userToken,coinId);
        setCoins(coins);
        setCoinSelected(coins.point_register);
    },[]);

    return(
        <div className="mainFrame" style={{backgroundColor:backgroundColor}}>
            <div className="mainBody">
                <Menu selectedMenu={3}></Menu>
                <div className="mainContent">
                    <div className="coinFrame">
                        <div className="coinHeader">
                            <span className="material-icons coinsBack" title="Voltar" onClick={()=>{history.push("/coins")}}>
                                arrow_back
                            </span>
                            <div className="coinContent">
                                    <div className="coinText">
                                        <h1>
                                            <img src={(coins.icon!=="")?(externalLinks.coinIcon+coins.icon):(defaultImage)} className="coinIcon"/>
                                            {"  "+coins.quantity} 
                                            {"  "+coins.name}
                                        </h1>
                                        {coins.description}
                                    </div>
                            </div>
                        <label className="coinStatementTitle">Ultimas interações</label>
                        </div>
                        <div className="coinBody">
                            <table className="coinTable">
                                <tr>
                                    <th>Descrição</th>
                                    <th>Data</th>
                                    <th style={{textAlign:"center"}}>Valor</th>
                                </tr>
                                {coinSelected.map((coin,index)=>(
                                    <tr style={{color:(coin.quantity>=0)?("green"):("red")}}>
                                        <td>{coin.description}</td>
                                        <td>{coin.created_at}</td>
                                        <td style={{textAlign:"center"}}>{((coin.quantity>=0)?("+"):("-"))+coin.quantity}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar></Navbar>
        </div>
    );

}

export default Coin;