import React, { useEffect, useState } from 'react'
import skillabLogo from "../assets/Marca_Negativo_Cor2.png"
import "../styles/components/navbar.css"
import { useHistory } from 'react-router-dom';
import getUser from '../services/requests/getUser';
import getCompany from '../services/requests/getCompany';
import Profile from './Profile';
import Company from './Company';
import defaultImage from "../assets/accountCircleNegative.svg";
import externalLinks from '../utils/externalLinks';

function Navbar() {
    const history = useHistory();
    const [navbarColor,setNavbarColor] = useState("#4A4A4A");
    const [userPicture,setUserPicture] = useState("");
    const [admin ,setAdmin] = useState(false);
    const [userName,setUserName] = useState("Usuario");
    const [profileVisible,setProfileVisible] = useState(false);
    const [companyVisible,setCompanyVisible] = useState(false);
	const [companyPicture, setCompanyPicture] = useState(skillabLogo);

    const handleLogout = () =>{
        sessionStorage.clear();
        window.location.reload();
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
        setUserPicture(userInfo.picture);
        setUserName(userInfo.name);
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if(!companyInfo){
            companyInfo = await getCompany(userToken);
        }
        if(companyInfo.logo!=""){
            setCompanyPicture(externalLinks.companyLogo+companyInfo.logo);
        }
        if(companyInfo.privilleges){
            if(userInfo.admin || companyInfo.privilleges[0]=='1')
                setAdmin(true);
            else
                setAdmin(false);
            setNavbarColor(companyInfo.first_color)
        }
    },[]);

    return(
        <div className="Navbar" style={{backgroundColor:navbarColor}}>
            <img className="NavbarLogo" src={companyPicture} />
            <div className="NavbarUser">
                <img style={{borderRadius:"40vw"}} src={(userPicture=="")?(defaultImage):(externalLinks.userPic+userPicture)} className="NavbarUserIcon"/>
                <label className="NavbarUserName">
                    {userName}
                </label>
                <div className="NavbarUserDropdown">
                    {(admin)&&(
                        <div className="NavbarUserDropdownItem" onClick={()=>{setCompanyVisible(true)}}>
                            <span className="material-icons NavbarUserDropdownIcon">
                            apartment
                            </span>
                            <span className="NavbarUserDropdownText">Empresa</span>
                        </div>
                    )}
                    <div className="NavbarUserDropdownItem" onClick={()=>{setProfileVisible(true)}}>
                        <span className="material-icons NavbarUserDropdownIcon">
                            badge
                        </span>
                        <span className="NavbarUserDropdownText">Perfil</span>
                    </div>
                    <div className="NavbarUserDropdownItem" onClick={handleLogout}>
                        <span className="material-icons NavbarUserDropdownIcon">
                            logout
                        </span>
                        <span className="NavbarUserDropdownText">Sair</span>
                    </div>
                </div>
            </div>
            {(profileVisible)&&(<Profile onClose={()=>{setProfileVisible(false)}}/>)}
            {(companyVisible)&&(<Company onClose={()=>{setCompanyVisible(false)}}/>)}
        </div>
    );

}

export default Navbar;