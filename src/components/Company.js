import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import "../styles/components/profile.css"
import updateCompany from '../services/requests/updateCompany';
import defaultImage from "../assets/companyIcon.svg";
import getCompany from '../services/requests/getCompany';
import fileToBase64 from '../utils/fileToBase64';
import createPosts from '../services/requests/createPosts';
import externalLinks from '../utils/externalLinks';


function Company({onClose}) {

	const [userData, setUserData] = useState();
	const token = sessionStorage.getItem("userToken");

	const [fieldName, setFieldName] = useState();
	const [fieldDescription, setFieldDescription] = useState();
    const [highlightColor,setHighlightColor] = useState("#C7C7C7");
    const [firstColor,setFirstColor] = useState("#C7C7C7");
    const [secondColor,setSecondColor] = useState("#C7C7C7");
    const [thirdColor,setThirdColor] = useState("#C7C7C7");
	const [companyPicture, setCompanyPicture] = useState(defaultImage);
	const [fieldImage, setFieldImage] = useState(null);
	const [companyId, setCompanyId] = useState(0);

	useEffect(async () => {

        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if(!companyInfo){
            companyInfo = await getCompany(token);
        }
        if(companyInfo.logo!=""){
            setCompanyPicture(externalLinks.companyLogo+companyInfo.logo);
        }
        setFieldName(companyInfo.name)
        setHighlightColor(companyInfo.first_color);
		setFirstColor(companyInfo.first_color);
		setSecondColor(companyInfo.second_color);
		setThirdColor(companyInfo.third_color);
        setCompanyId(companyInfo.id);
	}, []);

	const handleCompanyUpdate = async () => {
		let name = null;
		let description = null;
		let company_image = null;
		let first_color = null;
		let second_color = null;
		let third_color = null;
		if (fieldName) name = fieldName;
		if (fieldDescription) description = fieldDescription;
		if (firstColor) first_color = firstColor;
		if (secondColor) second_color = secondColor;
		if (thirdColor) third_color = thirdColor;

		let body = {
			name: name,
			description: description,
            first_color: first_color,
            second_color: second_color,
            third_color: third_color
		};


		if (fieldImage) {
			body.logo = fieldImage;
            
		}

        await updateCompany(token,companyId,body)

        sessionStorage.removeItem("companyInfo");

		window.location.reload();
	};
	

	const handleCompanyImage = async (e) => {
		let file = e.target.files[0];
		let imageBase64 = await fileToBase64(file);
		setFieldImage(imageBase64);
        setCompanyPicture(imageBase64);
	};
    
    return(
        <Modal onClose={onClose}>
            <h1 className="createQuestModalText">Editar Empresa - {fieldName}</h1>
            <div className="createQuestModalHeader" style={{margin:"2vw"}}>
                <label htmlFor="companyImageInput" className="createQuestModalIcon">                                
                    <img style={{cursor:"pointer",height:"35vh"}} src={companyPicture}/>
                </label>
                <input
                    id="companyImageInput"
                    style={{display:"none"}}
                    onChangeCapture={(e) => {
                        handleCompanyImage(e);
                    }}
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                />
                <div  className="createQuestModalInputs">
                    <input defaultValue={fieldName}  onChange={(e) => setFieldName(e.target.value)} placeholder="Nome da empresa" className="giveModalInput"/>
                    <div style={{display:"flex"}}>
                        <input value={firstColor} onChange={(e) => setFirstColor(e.target.value)} className="giveModalInput" type="color"/>               
                        <input value={secondColor} onChange={(e) => setSecondColor(e.target.value)} className="giveModalInput" type="color"/>
                        <input value={thirdColor} onChange={(e) => setThirdColor(e.target.value)} className="giveModalInput" type="color"/>
                    </div>
                    <textarea style={{width:"30vw",height:"15vh"}} onChange={(e) => setFieldDescription(e.target.value)} placeholder="Descrição da empresa" className="giveModalInput">
                        {fieldDescription}
                    </textarea>
                </div>
            </div>
            <div className="createQuestModalButtons">
                <button onClick={onClose} style={{backgroundColor:highlightColor,marginLeft:"auto"}} className="createQuestModalButton">
                    Cancelar
                </button>
                <button onClick={handleCompanyUpdate} style={{backgroundColor:highlightColor}} c className="createQuestModalButton">
                    Salvar
                    <span className="material-icons">
                        save
                    </span>
                </button>
            </div>
        </Modal>
    );

}

export default Company;