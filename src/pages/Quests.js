import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import Carousel from 'react-grid-carousel';
import "../styles/pages/quests.css";
import Progress from '../components/Progress';
import getQuests from '../services/requests/getQuests';
import getUser from '../services/requests/getUser';
import getCompany from '../services/requests/getCompany';
import {useHistory } from 'react-router';
import Modal from '../components/Modal';
import PlusButton from '../components/PlusButton';
import getCompanyUsers from '../services/requests/getCompanyUsers';
import createQuest from '../services/requests/createQuest';
import Confirmation from '../components/Confirmation';
import defaultImage from "../assets/questIcon.svg";
import playerIcon from "../assets/accountCircle.svg";
import fileToBase64 from '../utils/fileToBase64';
import externalLinks from '../utils/externalLinks';
import progressQuest from "../services/requests/progressQuest";
import Switch from '../components/Switch';

function Quests() {

    const [backgroundColor,setBackgroundColor] = useState("#C7C7C7");

    const [quests,setQuests] = useState([]);
    const [admin ,setAdmin] = useState(false);
    const [questDetailsVisible,setQuestDetailsVisible]=useState(false);
    const [selectedQuest,setSelectedQuest] = useState({})
    const [highlightColor,setHighlightColor] = useState("#C7C7C7");
    const [createQuestModal ,setCreateQuestModal] = useState(false);
    const [createQuestModalPlayers ,setCreateQuestModalPlayers] = useState(false);
    const [giveQuestModal ,setGiveQuestModal] = useState(false);
    const [questDescriptionInput, setQuestDescriptionInput]=useState("");
    const [questNameInput,setQuestNameInput]=useState("");
    const [playersList,setPlayersList] = useState([]);
    const [playersIdList,setPlayersIdList] = useState([]);
    const [confirmationVisible,setConfirmationVisible] = useState(false);
    const [progressField,setProgressField] = useState(0);
    const [confirmationText,setConfirmationText] = useState("");
    const [confirmationFunction,setConfirmationFunction] = useState(()=>{});
    const [questType, setQuestType]=useState(0);
    

	const [fieldImage, setFieldImage] = useState(defaultImage);

	const handleQuestImage = async (e) => {
		let file = e.target.files[0];
		let imageBase64 = await fileToBase64(file);
		setFieldImage(imageBase64);
	};

    const handleCreateQuestPlayers = (check)=>{
        setCreateQuestModalPlayers(check)
        if(check){
            setQuestType(1);
        }
        else{
            setQuestType(0);
        }
    }

    const handleProgressQuest = async()=>{
        const userToken=sessionStorage.getItem("userToken");
        if(!userToken){
            await history.push("/login")
        }

        const body={
            quest_id:selectedQuest.id,
            progress:progressField,
            description:"Progresso da missão modificado pelo admnistrador",
            users_id:playersIdList
        }
        
        await progressQuest(userToken,body);
        setGiveQuestModal(false);
        window.location.reload();
    }

    const history= useHistory()

    const handleCreateQuest=async ()=>{
        const userToken=sessionStorage.getItem("userToken");
        if(!userToken){
            await history.push("/login")
        }
        let newQuest = {
            name:questNameInput,
            type:questType,
            reward_type:0,
            description:questDescriptionInput,
            players:playersIdList
        }
        if(fieldImage){
            newQuest.icon=fieldImage
        }
        await createQuest(userToken,newQuest);
        setCreateQuestModal(false);
        const quests = await getQuests(userToken);
        setQuests(quests);
    }

    const handlePlayerChecked = (isChecked,id)=>{
        let playersId = playersIdList;
        if(isChecked && !playersId.includes(id)){
            playersId.push(id)
        }
        if(!isChecked && playersIdList.includes(id)){
            playersId.splice(playersId.indexOf(id), 1);
        }
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
            if(userInfo.admin || companyInfo.privilleges[4]=='1')
                setAdmin(true);
            else
                setAdmin(false);
        }


        const companyUsers = await getCompanyUsers(userToken,userInfo.selected_company);
        setPlayersList(companyUsers);

        const quests = await getQuests(userToken);
        setQuests(quests);
    },[]);
    return(
        <div className="mainFrame" style={{backgroundColor:backgroundColor}}>
            <div className="mainBody">
                <Menu selectedMenu={4}></Menu>
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
                >
                    {quests.map((quest, index) => (
                        <Carousel.Item key={index}>
                            <div className="questsCarouselItem">
                                {(admin)&&(
                                    <div className="marketCarouselItemOptions">
                                        {/* <span style={{marginLeft:"auto"}} className="material-icons marketCarouselItemOption">
                                            delete
                                        </span>
                                        <span className="material-icons marketCarouselItemOption">
                                            edit
                                        </span> */}
                                        <span style={{marginLeft:"auto"}} onClick={()=>{setSelectedQuest(quest);setGiveQuestModal(true)}} className="material-icons marketCarouselItemOption">
                                            add_circle
                                        </span>
                                    </div>
                                )}
                                <img src={(quest.icon!="" && quest.icon!=null)?(externalLinks.questIcon+quest.icon):(defaultImage)} onClick={()=>{setSelectedQuest(quest);setQuestDetailsVisible(true)}} className="questsCarouselItemIcon"/>
                                <h2 className="questsCarouselItemTitle">
                                    {quest.name}
                                </h2>
                                <Progress progress={quest.progress}></Progress>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                </div>
            </div>
            
            {(confirmationVisible)&&(
                <Confirmation onClose={()=>{setConfirmationVisible(false)}} onConfirm={confirmationFunction}>
                    {confirmationText}
                </Confirmation>
            )}
            {(giveQuestModal) && (
               <Modal onClose={()=>{setGiveQuestModal(false)}}>
                   <div className="giveModal">
                       <div className="giveModalHeader">                                
                            <img src={(selectedQuest.icon!="" && selectedQuest.icon!=null)?(externalLinks.questIcon+selectedQuest.icon):(defaultImage)}/>
                            <div className="giveModalTitle">
                                <h1>Dar moeda - {selectedQuest.name}</h1>
                                <div>
                                    <h3 style={{display:"inline-block"}}>Porcentagem:</h3>
                                    <input onChange={(e)=>{setProgressField(e.target.value)}} min={0} max={100} className="giveModalInput" type="number" />
                                </div>
                            </div>
                       </div>
                       <div className="playersQuestList">
                           <table className="playersTable">
                               {playersList.map((player,index)=>(
                                   <tr>
                                       <td className="playerCheckboxColumn">
                                           <input onChange={(e) => handlePlayerChecked(e.target.checked,player.id)} type="checkbox" className="playerCheckbox"/>
                                       </td>
                                       <td className="playerIconColumn">
                                            <img style={{borderRadius:"40vw"}} src={(player.picture=="")?(playerIcon):(externalLinks.userPic+player.picture)} className="playerIcon"/>
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
                           <button onClick={()=>{setGiveQuestModal(false)}} style={{backgroundColor:highlightColor,marginLeft:"auto"}} className="createBadgeModalButton">
                               Cancelar
                           </button>
                           <button onClick={handleProgressQuest} style={{backgroundColor:highlightColor}} className="createBadgeModalButton">
                               Salvar
                               <span className="material-icons">
                                   save
                               </span>
                           </button>
                       </div>
                   </div>
               </Modal>
           )}
            {(createQuestModal)&&(
                 <Modal onClose={()=>{setCreateQuestModal(false)}}>
                    <div className="createQuestModal">
                        <h1 className="createQuestModalText">Criação de Missões</h1>
                        <div className="createQuestModalHeader">
                            <label htmlFor="questImageInput" className="createQuestModalIcon">                                
                                <img style={{cursor:"pointer"}} src={fieldImage}/>
                            </label>
                            <input
                                id="questImageInput"
                                style={{display:"none"}}
                                onChangeCapture={(e) => {
                                    handleQuestImage(e);
                                }}
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg,image/jpg"
                            />
                            <div  className="createQuestModalInputs">
                                <input  onChange={(e) => setQuestNameInput(e.target.value)} placeholder="Nome da missão" className="createQuestModalName"/>
                                <textarea  onChange={(e) => setQuestDescriptionInput(e.target.value)} placeholder="Descrição da missão" className="createQuestModalDescription"/>
                            </div>
                        </div>
                        <div className="createQuestSwitch">
                            <span>Deseja restringir a missão para pessoas específicas?</span>
                            <Switch onChecked={(check)=>handleCreateQuestPlayers(check)}></Switch>
                        </div>
                        {(createQuestModalPlayers)&&
                        (<div className="playersQuestList">
                            <table className="playersTable">
                                {playersList.map((player,index)=>(
                                    <tr>
                                        <td className="playerCheckboxColumn">
                                            <input onChange={(e) => handlePlayerChecked(e.target.checked,player.id)} type="checkbox" className="playerCheckbox"/>
                                        </td>
                                       <td className="playerIconColumn">
                                            <img style={{borderRadius:"40vw"}} src={(player.picture=="")?(playerIcon):(externalLinks.userPic+player.picture)} className="playerIcon"/>
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
                        </div>)}
                        <div className="createQuestModalButtons">
                            <button onClick={()=>{setCreateQuestModal(false)}} style={{backgroundColor:highlightColor,marginLeft:"auto"}} className="createQuestModalButton">
                                Cancelar
                            </button>
                            <button onClick={handleCreateQuest} style={{backgroundColor:highlightColor}} className="createQuestModalButton">
                                Salvar
                                <span className="material-icons">
                                    save
                                </span>
                            </button>
                        </div>
                    </div>
                 </Modal>
             )}
             {(admin)&&(
                 <PlusButton onClickFunction={()=>{setCreateQuestModal(true)}}/>
             )}
             {(questDetailsVisible)&&(
                  <Modal onClose={()=>{setQuestDetailsVisible(false)}}>
                     <div className="questDetailModal">
                         <div className="questDetailModalHeader">                  
                                <img className="questDetailModalIcon" src={(selectedQuest.icon!="" && selectedQuest.icon!=null)?(externalLinks.questIcon+selectedQuest.icon):(defaultImage)}/>
                                <div style={{width:"80%"}}>
                                    <h1 className="questDetailModalTitle">
                                        {selectedQuest.name}
                                    </h1>
                                    <Progress progress={selectedQuest.progress}></Progress>
                                </div>
                         </div>
                         <pre className="questDetailModalDescription">
                            {selectedQuest.description}
                         </pre>
                     </div>
                  </Modal>
              )}
              <Navbar></Navbar>
        </div>
    );

}

export default Quests;
