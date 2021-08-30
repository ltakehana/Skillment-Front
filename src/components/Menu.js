import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import LoadingComponent from './LoadingComponent';
import getCompany from '../services/requests/getCompany';
import "../styles/components/menu.css"
import { is } from '@babel/types';

function Menu({ selectedMenu }) {
    const history = useHistory()

    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("#4A4A4A");
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");
    const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
    const [color, setColor] = useState("#000000");
    const [isLoading, setIsLoading] = useState(false);

    const goTo = (link) => {
        history.push(link);
    }

    const menuItens = [
        {
            icon: "home",
            description: "Tela inicial",
            link: "/"
        },
        {
            icon: "military_tech",
            description: "Insígnias",
            link: "/badges"
        },
        //        {
        //            icon:"local_grocery_store",
        //            description:"Loja",
        //            link:"/market"
        //        },
        {
            icon: "monetization_on",
            description: "Moedas",
            link: "/coins"
        },
        {
            icon: "groups",
            description: "Jogadores",
            link: "/players"
        },
        //        {
        //            icon: "emoji_events",
        //            description: "Rankings",
        //            link: "/ranking"
        //        },
        {
            icon: "flag",
            description: "Missões",
            link: "/quests"
        },
    ];


    useEffect(async () => {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
            history.push("/login")
        }
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if (!companyInfo) {
            companyInfo = await getCompany(userToken);
        }
        setIsLoading(false);
        setSelectedBackgroundColor(companyInfo.first_color);
        setSelectedColor(companyInfo.third_color);
    }, []);


    return (
        <div className="Menu">
            <div className="SelectedMenuIcon" onClick={() => { goTo(menuItens[selectedMenu].link) }} title={menuItens[selectedMenu].description} style={{ backgroundColor: selectedBackgroundColor }}>
                <span className="material-icons" title={menuItens[selectedMenu].description} style={{ color: selectedColor }}>
                    {menuItens[selectedMenu].icon}
                </span>
            </div>
            {menuItens.map((item, index) => (
                (selectedMenu !== index) && (<div className="MenuIcon" onClick={() => { goTo(item.link) }} title={item.description} style={{ backgroundColor: backgroundColor }}>
                    <span className="material-icons" title={item.description} style={{ color: color }}>
                        {item.icon}
                    </span>
                </div>)
            ))}
            <LoadingComponent isOpen={isLoading} />
        </div>
    );

}

export default Menu;