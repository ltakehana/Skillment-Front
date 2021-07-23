import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import Carousel from 'react-grid-carousel';
import "../styles/pages/badges.css";
import Progress from '../components/Progress';
import getBadges from '../services/requests/getBadges';
import { useHistory } from 'react-router';
import getCompany from '../services/requests/getCompany';
import getUser from '../services/requests/getUser';
import PlusButton from '../components/PlusButton';
import Modal from '../components/Modal';
import createBadge from '../services/requests/createBadge';
import getCompanyUsers from '../services/requests/getCompanyUsers';
import defaultImage from "../assets/badgeIcon.svg";
import playerIcon from "../assets/accountCircle.svg";
import fileToBase64 from '../utils/fileToBase64';
import externalLinks from '../utils/externalLinks';
import completeBadge from '../services/requests/completeBadge';


function Badges() {
    const history= useHistory()

    const [backgroundColor,setBackgroundColor] = useState("#C7C7C7");
    const [admin ,setAdmin] = useState(false);
    const [highlightColor,setHighlightColor] = useState("#C7C7C7");
    const [createBadgeModal ,setCreateBadgeModal] = useState(false);
    const [badgeDescriptionInput, setBadgeDescriptionInput]=useState("");
    const [badgeNameInput,setBadgeNameInput]=useState("");
    const [selectedBadge,setSelectedBadge] = useState({})
    const [badges,setBadges] = useState([]);
    const [badgeDetailsVisible,setBadgeDetailsVisible]=useState(false);
    const [playersList,setPlayersList] = useState([]);
    const [playersIdList,setPlayersIdList] = useState([]);
    const [giveBadgeModal,setGiveBadgeModal] = useState(false);

	const [fieldImage, setFieldImage] = useState(defaultImage);

	const handleBadgeImage = async (e) => {
		let file = e.target.files[0];
		let imageBase64 = await fileToBase64(file);
		setFieldImage(imageBase64);
	};


    const handleCompleteBadge = async()=>{
        const userToken=sessionStorage.getItem("userToken");
        if(!userToken){
            await history.push("/login")
        }

        const body={
            badge_id:selectedBadge.id,
            description:"Insígnia doada pelo admnistrador",
            users_id:playersIdList
        }
        
        await completeBadge(userToken,body);
        setGiveBadgeModal(false);
        window.location.reload();
    }


    const handlePlayerChecked = (isChecked,id)=>{
        let playersId = playersIdList;
        if(isChecked && !playersId.includes(id)){
            playersId.push(id)
        }
        if(!isChecked && playersIdList.includes(id)){
            playersId.splice(playersId.indexOf(id), 1);
        }
        setPlayersIdList(playersId);
    }

    const handleCreateBadge=async ()=>{
        const userToken=sessionStorage.getItem("userToken");
        if(!userToken){
            await history.push("/login")
        }
        await createBadge(userToken,badgeNameInput,badgeDescriptionInput,fieldImage);
        setCreateBadgeModal(false);
        const badges = await getBadges(userToken);
        setBadges(badges);

    }

    useEffect(async ()=>{
        const userToken=sessionStorage.getItem("userToken");
        if(!userToken){
            await history.push("/login")
        }
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if(!userInfo){
            userInfo = await getUser(userToken);
        }
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if(!companyInfo){
            companyInfo = await getCompany(userToken);
        }
        setBackgroundColor(companyInfo.second_color);
        setHighlightColor(companyInfo.first_color);

        if(companyInfo.privilleges){
            if(userInfo.admin || companyInfo.privilleges[3]=='1')
                setAdmin(true);
            else
                setAdmin(false);
        }

        const companyUsers = await getCompanyUsers(userToken,userInfo.selected_company);
        setPlayersList(companyUsers);

        const badges = await getBadges(userToken);
        setBadges(badges);
    },[]);


    return(
        <div className="mainFrame" style={{backgroundColor:backgroundColor}}>
            <div className="mainBody">
                <Menu selectedMenu={1}></Menu>
                <div className="mainContent">
                <Carousel
                    cols={4}
                    rows={3}
                    gap={1}
                    containerStyle={{
                        background: 'transparent',
                        width:"90%",
                        height:"90%",
                        margin:"auto"
                    }}
                    className="badgesCarousel"
                >
                    {badges.map((badge, index) => (
                        <Carousel.Item key={index}>
                            <div className="badgesCarouselItem" style={{opacity:(badge.complete || admin)?("100%"):("80%")}}>
                                {(admin)&&(
                                    <div className="marketCarouselItemOptions">
                                        {/* <span style={{marginLeft:"auto"}} className="material-icons marketCarouselItemOption">
                                            delete
                                        </span>
                                        <span className="material-icons marketCarouselItemOption">
                                            edit
                                        </span> */}
                                        <span style={{marginLeft:"auto"}} onClick={()=>{setSelectedBadge(badge);setGiveBadgeModal(true)}} className="material-icons marketCarouselItemOption">
                                            add_circle
                                        </span>
                                    </div>
                                )}
                                <img src={(badge.icon!="")?(externalLinks.badgeIcon+badge.icon):(defaultImage)} onClick={()=>{setSelectedBadge(badge);setBadgeDetailsVisible(true)}} style={{opacity:(badge.complete && admin)?("100%"):("30%")}} className="badgesCarouselItemIcon"/>
                                <h2 className="badgesCarouselItemTitle">
                                    {badge.name}
                                </h2>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                </div>
            </div>
            {(admin)&&(
                <PlusButton onClickFunction={()=>{setCreateBadgeModal(true)}}/>
            )}
            {(createBadgeModal)&&(
                 <Modal onClose={()=>{setCreateBadgeModal(false)}}>
                    <div className="createBadgeModal">
                        <h1 className="createBadgeModalText">Criação de insígnias</h1>
                        <label htmlFor="badgeImageInput" style={{margin:"auto"}}>                                
                            <img style={{cursor:"pointer",height:"15vh"}} src={fieldImage}/>
                        </label>
                        <input
                            id="badgeImageInput"
                            style={{display:"none"}}
                            onChangeCapture={(e) => {
                                handleBadgeImage(e);
                            }}
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg,image/jpg"
			            />
                        <input  onChange={(e) => setBadgeNameInput(e.target.value)} placeholder="Nome da moeda" className="createBadgeModalName"/>
                        <textarea  onChange={(e) => setBadgeDescriptionInput(e.target.value)} placeholder="Descrição da moeda" className="createBadgeModalDescription"/>
                        <div className="createBadgeModalButtons">
                            <button onClick={()=>{setCreateBadgeModal(false)}} style={{backgroundColor:highlightColor,marginLeft:"auto"}} className="createBadgeModalButton">
                                Cancelar
                            </button>
                            <button onClick={handleCreateBadge} style={{backgroundColor:highlightColor}} className="createBadgeModalButton">
                                Salvar
                                <span className="material-icons">
                                    save
                                </span>
                            </button>
                        </div>
                    </div>
                 </Modal>
             )}
             {(giveBadgeModal) && (
                <Modal onClose={()=>{setGiveBadgeModal(false)}}>
                    <div className="giveModal">
                        <div className="giveModalHeader">                                
                            <img src={(selectedBadge.icon!="")?(externalLinks.badgeIcon+selectedBadge.icon):(defaultImage)} />
                            <h1 className="giveModalTitle">
                                Atribuir insígnia - {selectedBadge.name}
                            </h1>
                        </div>
                        <div className="playersQuestList">
                            <table className="playersTable">
                                {playersList.map((player,index)=>(
                                    <tr>
                                        <td className="playerCheckboxColumn">
                                            <input onChange={(e) => handlePlayerChecked(e.target.checked,player.id)} type="checkbox" className="playerCheckbox"/>
                                        </td>
                                       <td className="playerIconColumn">
                                           <img src={playerIcon} className="playerIcon"/>
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
                            <button onClick={()=>{setGiveBadgeModal(false)}} style={{backgroundColor:highlightColor,marginLeft:"auto"}} className="createBadgeModalButton">
                                Cancelar
                            </button>
                            <button onClick={handleCompleteBadge} style={{backgroundColor:highlightColor}} className="createBadgeModalButton">
                                Salvar
                                <span className="material-icons">
                                    save
                                </span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
             {(badgeDetailsVisible)&&(
                  <Modal onClose={()=>{setBadgeDetailsVisible(false)}}>
                     <div className="badgeDetailModal">
                         <div className="badgeDetailModalHeader">                              
                                <img src={(selectedBadge.icon!="")?(externalLinks.badgeIcon+selectedBadge.icon):(defaultImage)} className="badgeDetailModalIcon"/>
                                <h1 className="badgeDetailModalTitle">
                                    {selectedBadge.name}
                                </h1>
                         </div>
                         <div className="badgeDetailModalDescription">
                            {selectedBadge.description}
                         </div>
                     </div>
                  </Modal>
              )}
              <Navbar></Navbar>
        </div>
    );

}

export default Badges;