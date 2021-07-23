import React, { useState } from 'react'
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import Carousel from 'react-grid-carousel';
import "../styles/pages/market.css";


function Market() {

    const [backgroundColor,setBackgroundColor] = useState("#C7C7C7");

    const [itens,setItens] = useState([
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:73,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:32,

        },
        {
            title:"Teste",
            icon:null,
            price:53,

        },
        {
            title:"Teste",
            icon:null,
            price:33,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        },
        {
            title:"Teste",
            icon:null,
            price:23,

        }
    ]);

    return(
        <div className="mainFrame" style={{backgroundColor:backgroundColor}}>
            <Navbar></Navbar>
            <div className="mainBody">
                <Menu selectedMenu={2}></Menu>
                <div className="mainContent">
                    <Carousel
                        cols={4}
                        rows={3}
                        gap={1}
                        containerStyle={{
                            width:"90%",
                            height:"90%",
                            margin:"auto"

                        }}
                    >
                        {itens.map((item, index) => (
                            <Carousel.Item key={index}>
                                <div className="marketCarouselItem">
                                    <span className="material-icons marketCarouselItemIcon">
                                        emoji_events
                                    </span>
                                    <h2 className="marketCarouselItemTitle">
                                        {item.title}
                                    </h2>
                                    <div className="marketCarouselItemPrice">
                                        <span className="material-icons">
                                            monetization_on
                                        </span>
                                        <label>{item.price}</label>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );

}

export default Market;