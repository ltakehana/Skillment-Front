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
import ChangeCompany from './ChangeCompany';
import ChangePassword from './ChangePassword';

function Navbar() {
    const history = useHistory();
    const [navbarColor,setNavbarColor] = useState("#4A4A4A");
    const [userPicture,setUserPicture] = useState("");
    const [admin ,setAdmin] = useState(false);
    const [userName,setUserName] = useState("Usuario");
    const [userCompanies,setUserCompanies] = useState([]);
    const [profileVisible,setProfileVisible] = useState(false);
    const [companyVisible,setCompanyVisible] = useState(false);
	const [companyPicture, setCompanyPicture] = useState(skillabLogo);
	const [changeCompanyVisible, setChangeCompanyVisible] = useState(false);
	const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [highlightColor,setHighlightColor] = useState("#4A4A4A");

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
        setUserCompanies(userInfo.companies);
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
                <label className="NavbarUserName" >
                    {userName}
                </label>
                <div className="NavbarUserDropdown">
                    {(userCompanies.length>1)&&(
                        <div className="NavbarUserDropdownItem" onClick={()=>{setChangeCompanyVisible(true)}}>
                            <span className="material-icons NavbarUserDropdownIcon">
                                swap_horiz
                            </span>
                            <span className="NavbarUserDropdownText">Trocar empresa</span>
                        </div>
                    )}
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
            {(profileVisible)&&(<Profile onChangePassword={()=>{setChangePasswordVisible(true)}} onClose={()=>{setProfileVisible(false)}}/>)}
            {(companyVisible)&&(<Company onClose={()=>{setCompanyVisible(false)}}/>)}
            {(changeCompanyVisible)&&(<ChangeCompany onClose={()=>{setChangeCompanyVisible(false)}}/>)}
            {(changePasswordVisible)&&(<ChangePassword onClose={()=>{setChangePasswordVisible(false)}}></ChangePassword>)}
        </div>
    );

}

export default Navbar;