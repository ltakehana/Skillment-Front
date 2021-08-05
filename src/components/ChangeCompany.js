import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import "../styles/components/profile.css"
import getUser from '../services/requests/getUser';
import getCompany from '../services/requests/getCompany';
import updateProfile from '../services/requests/updateProfile';
import externalLinks from '../utils/externalLinks';
import Carousel from 'react-grid-carousel';
import defaultImage from "../assets/companyIcon.svg";

function ChangeCompany({onClose}) {

	const token = sessionStorage.getItem("userToken");

	const [companies, setCompanies] = useState([]);
    const [highlightColor,setHighlightColor] = useState("#C7C7C7");

	useEffect(async () => {

        let responseUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if(!responseUserInfo){
            responseUserInfo = await getUser(token);
        }
		if (responseUserInfo) {
			if (responseUserInfo.companies) {
				setCompanies(
					responseUserInfo.companies
				);
			}
		}
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if(!companyInfo){
            companyInfo = await getCompany(token);
        }
        setHighlightColor(companyInfo.first_color);

	}, []);

	const handleChangeCompanyUpdate = async (id) => {
		let body = {
			selected_company: id
		};

        await updateProfile(token,body);

        sessionStorage.removeItem("companyInfo");
        sessionStorage.removeItem("userInfo");
        
		window.location.reload();
	};


    return(
        <Modal onClose={onClose}>
            <h1 className="postModalText">Selecionar empresa</h1>
            <div className="changecompanyModal">
                <Carousel
                    cols={2}
                    rows={1}
                    containerStyle={{
                        background: 'transparent',
                        margin:"auto"
                    }}
                >
                    {companies.map((company, index) => (
                        <Carousel.Item key={index}>
                            <div style={{margin:"3vw"}} onClick={()=>{handleChangeCompanyUpdate(company.id)}}>
                                <img src={(company.logo!="" && company.logo!=null)?(externalLinks.companyLogo+company.logo):(defaultImage)}  className="badgesCarouselItemIcon" style={{height:"10vh",cursor:"pointer"}}/>
                                <h2 className="badgesCarouselItemTitle">
                                    {company.name}
                                </h2>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className="createQuestModalButtons">
                    <button onClick={onClose} style={{backgroundColor:highlightColor,marginLeft:"auto"}} className="createQuestModalButton">
                        Cancelar
                    </button>
                    <button onClick={handleChangeCompanyUpdate} style={{backgroundColor:highlightColor}} className="createQuestModalButton">
                        Salvar
                        <span className="material-icons">
                            save
                        </span>
                    </button>
                </div>
            </div>
        </Modal>
    );

}

export default ChangeCompany;