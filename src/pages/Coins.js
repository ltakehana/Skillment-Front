import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom';
import "../styles/pages/coins.css"
import Carousel from 'react-grid-carousel';
import "../styles/pages/market.css";
import getCoins from '../services/requests/getCoins';
import getCompany from '../services/requests/getCompany';
import getUser from '../services/requests/getUser';
import PlusButton from '../components/PlusButton';
import Modal from '../components/Modal';
import createCoin from '../services/requests/createCoin';
import getCompanyUsers from '../services/requests/getCompanyUsers';
import defaultImage from "../assets/coinIcon.svg";
import playerIcon from "../assets/accountCircle.svg";
import fileToBase64 from '../utils/fileToBase64';
import externalLinks from '../utils/externalLinks'
import addCoins from '../services/requests/addCoins';
import LoadingComponent from '../components/LoadingComponent';
import ErrorModal from '../components/ErrorModal';


function Coins() {

    const history = useHistory();

    const [coins, setCoins] = useState([]);
    const [highlightColor, setHighlightColor] = useState("#C7C7C7");
    const [backgroundColor, setBackgroundColor] = useState("#C7C7C7");
    const [admin, setAdmin] = useState(false);
    const [createCoinModal, setCreateCoinModal] = useState(false);
    const [coinDescriptionInput, setCoinDescriptionInput] = useState("");
    const [coinNameInput, setCoinNameInput] = useState("");
    const [playersList, setPlayersList] = useState([]);
    const [quantityField, setQuantityField] = useState(0);
    const [playersIdList, setPlayersIdList] = useState([]);
    const [giveCoinsModal, setGiveCoinsModal] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isOnError, setIsOnError] = useState(false);

    const [fieldImage, setFieldImage] = useState(defaultImage);

    const handleCoinImage = async (e) => {
        setIsLoading(true);
        let file = e.target.files[0];
        let imageBase64 = await fileToBase64(file);
        setFieldImage(imageBase64);
        setIsLoading(false);
    };

    const handleAddCoins = async () => {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
            history.push("/login")
        }

        const body = {
            points_id: selectedCoin.id,
            quantity: quantityField,
            description: "Pontos adicionados pelo admnistrador",
            users_id: playersIdList
        }
        await addCoins(userToken, body);
        setGiveCoinsModal(false);
        setIsLoading(false);
        window.location.reload();
    }

    const handlePlayerChecked = (isChecked, id) => {
        let playersId = playersIdList;
        if (isChecked && !playersId.includes(id)) {
            playersId.push(id)
        }
        if (!isChecked && playersIdList.includes(id)) {
            playersId.splice(playersId.indexOf(id), 1);
        }
        setPlayersIdList(playersId);
    }


    const handleCreateCoin = async () => {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
            history.push("/login")
        }
        await createCoin(userToken, coinNameInput, coinDescriptionInput, fieldImage);
        if (!createCoin)
            setIsOnError(true);
        else
            setCreateCoinModal(false);
        const coins = await getCoins(userToken);
        if (!coins)
            setIsOnError(true);
        else
            setCoins(coins);
        setIsLoading(false);
    }


    useEffect(async () => {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
            history.push("/login")
        }
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (!userInfo) {
            userInfo = await getUser(userToken);
            if (!userInfo)
                setIsOnError(true);
        }
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if (!companyInfo) {
            companyInfo = await getCompany(userToken);
            if (!companyInfo)
                setIsOnError(true);
        }
        setBackgroundColor(companyInfo.second_color);
        setHighlightColor(companyInfo.first_color);


        if (companyInfo.privilleges) {
            if (userInfo.admin || companyInfo.privilleges[2] === '1')
                setAdmin(true);
            else
                setAdmin(false);
        }

        const companyUsers = await getCompanyUsers(userToken, userInfo.selected_company);
        if (!companyUsers)
            setIsOnError(true);
        else
            setPlayersList(companyUsers);

        const coins = await getCoins(userToken);
        if (!coins)
            setIsOnError(true);
        else
            setCoins(coins);
        setIsLoading(false);
    }, []);

    return (
        <div className="mainFrame" style={{ backgroundColor: backgroundColor }}>
            <div className="mainBody">
                <Menu selectedMenu={2}></Menu>
                <div className="mainContent">
                    <Carousel
                        cols={4}
                        rows={3}
                        gap={1}
                        containerStyle={{
                            width: "90%",
                            height: "90%",
                            margin: "auto"

                        }}
                    >
                        {coins.map((coin, index) => (
                            <Carousel.Item key={index}>
                                <div className="marketCarouselItem" >
                                    {(admin) && (
                                        <div className="marketCarouselItemOptions">
                                            <span style={{ marginLeft: "auto" }} className="material-icons marketCarouselItemOption">
                                                delete
                                            </span>
                                            <span className="material-icons marketCarouselItemOption">
                                                edit
                                            </span>
                                            <span onClick={() => { setSelectedCoin(coin); setGiveCoinsModal(true) }} className="material-icons marketCarouselItemOption">
                                                add_circle
                                            </span>
                                        </div>
                                    )}
                                    <img src={(coin.icon !== "") ? (externalLinks.coinIcon + coin.icon) : (defaultImage)} className="marketCarouselItemIcon" onClick={() => {
                                        history.push("/coins/" + coin.id)
                                    }} />

                                    <h2 className="marketCarouselItemTitle" onClick={() => {
                                        history.push("/coins/" + coin.id)
                                    }}>
                                        {coin.name}
                                    </h2>
                                    <div className="marketCarouselItemPrice">
                                        <span className="material-icons">
                                            monetization_on
                                        </span>
                                        <label>{coin.quantity}</label>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
            {(admin) && (
                <PlusButton onClickFunction={() => { setCreateCoinModal(true) }} />
            )}
            {(giveCoinsModal) && (
                <Modal onClose={() => { setGiveCoinsModal(false) }}>
                    <div className="giveModal">
                        <div className="giveModalHeader">
                            <img src={(selectedCoin.icon !== "") ? (externalLinks.coinIcon + selectedCoin.icon) : (defaultImage)} />
                            <div className="giveModalTitle">
                                <h1>Dar moeda - {selectedCoin.name}</h1>
                                <div>
                                    <h3 style={{ display: "inline-block" }}>Quantidade:</h3>
                                    <input onChange={(e) => { setQuantityField(e.target.value) }} className="giveModalInput" type="number" />
                                </div>
                            </div>
                        </div>
                        <div className="playersQuestList">
                            <table className="playersTable">
                                {playersList.map((player, index) => (
                                    <tr>
                                        <td className="playerCheckboxColumn">
                                            <input onChange={(e) => handlePlayerChecked(e.target.checked, player.id)} type="checkbox" className="playerCheckbox" />
                                        </td>
                                        <td className="playerIconColumn">
                                            <img src={playerIcon} className="playerIcon" />
                                        </td>
                                        <td className="playerNameColumn">
                                            <label className="playerName">{player.name}</label>
                                        </td>
                                        <td className="playerCompanyColumn">
                                            <label className="playerCompany">{player.company_name}</label>
                                        </td>
                                        <td className="playerOfficeColumn">
                                            <label className="playerOffice">{player.office}</label>
                                        </td>
                                        <td className="playerEmailColumn">
                                            <label className="playerEmail">{player.email}</label>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                        <div className="createBadgeModalButtons">
                            <button onClick={() => { setGiveCoinsModal(false) }} style={{ backgroundColor: highlightColor, marginLeft: "auto" }} className="createBadgeModalButton">
                                Cancelar
                            </button>
                            <button onClick={handleAddCoins} style={{ backgroundColor: highlightColor }} className="createBadgeModalButton">
                                Salvar
                                <span className="material-icons">
                                    save
                                </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            {(createCoinModal) && (
                <Modal onClose={() => { setCreateCoinModal(false) }}>
                    <div className="createCoinModal">
                        <h1 className="createCoinModalText">Criação de moedas</h1>
                        <label htmlFor="coinImageInput" style={{ margin: "auto" }}>
                            <img style={{ cursor: "pointer", height: "15vh" }} src={fieldImage} />
                        </label>
                        <input
                            id="coinImageInput"
                            style={{ display: "none" }}
                            onChangeCapture={(e) => {
                                handleCoinImage(e);
                            }}
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg,image/jpg"
                        />
                        <input onChange={(e) => setCoinNameInput(e.target.value)} placeholder="Nome da moeda" className="createCoinModalName" />
                        <textarea onChange={(e) => setCoinDescriptionInput(e.target.value)} placeholder="Descrição da moeda" className="createCoinModalDescription" />
                        <div className="createCoinModalButtons">
                            <button onClick={() => { setCreateCoinModal(false) }} style={{ backgroundColor: highlightColor, marginLeft: "auto" }} className="createCoinModalButton">
                                Cancelar
                            </button>
                            <button onClick={handleCreateCoin} style={{ backgroundColor: highlightColor }} className="createCoinModalButton">
                                Salvar
                                <span className="material-icons">
                                    save
                                </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <Navbar></Navbar>
            <LoadingComponent isOpen={isLoading} />
            <ErrorModal isOpen={isOnError} onClose={() => setIsOnError(false)}/>
        </div>
    );

}

export default Coins;