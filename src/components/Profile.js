import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import LoadingComponent from './LoadingComponent';
import "../styles/components/profile.css"
import getUser from '../services/requests/getUser';
import defaultImage from "../assets/accountCircle.svg";
import getCompany from '../services/requests/getCompany';
import fileToBase64 from '../utils/fileToBase64';
import updateProfile from '../services/requests/updateProfile';
import externalLinks from '../utils/externalLinks';


function Profile({ onChangePassword, onClose }) {

    const [userData, setUserData] = useState();
    const token = sessionStorage.getItem("userToken");

    const [fieldName, setFieldName] = useState();
    const [fieldEmail, setFieldEmail] = useState();
    const [fieldTel, setFieldTel] = useState();
    const [fieldBirth, setFieldBirth] = useState();
    const [fieldImage, setFieldImage] = useState();
    const [fieldBio, setFieldBio] = useState();
    const [highlightColor, setHighlightColor] = useState("#C7C7C7");
    const [profileImage, setProfileImage] = useState(defaultImage);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);

        let responseUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (!responseUserInfo) {
            responseUserInfo = await getUser(token);
        }
        setUserData(responseUserInfo);
        if (responseUserInfo) {
            if (responseUserInfo.name) setFieldName(responseUserInfo.name);
            if (responseUserInfo.email) setFieldEmail(responseUserInfo.email);
            if (responseUserInfo.bio) setFieldBio(responseUserInfo.bio);
            if (responseUserInfo.telephone)
                setFieldTel(responseUserInfo.telephone);
            if (responseUserInfo.birth_date) {
                setFieldBirth(
                    responseUserInfo.birth_date.replace(" 00:00:00", ""),
                );
            }
            if (responseUserInfo.picture) {
                setProfileImage(
                    externalLinks.userPic + responseUserInfo.picture
                );
            }
        }
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if (!companyInfo) {
            companyInfo = await getCompany(token);
        }
        setHighlightColor(companyInfo.first_color);
        setIsLoading(false);
    }, []);

    const handleProfileUpdate = async () => {
        setIsLoading(true);
        let name = null;
        let email = null;
        let telephone = null;
        let birth_date = null;
        let profile_image = null;
        let bio = null;
        if (fieldName) name = fieldName;
        if (fieldEmail) email = fieldEmail;
        if (fieldTel) telephone = fieldTel;
        if (fieldBio) bio = fieldBio;
        if (fieldBirth) {
            birth_date = fieldBirth;
        }
        if (fieldImage) {
            profile_image = fieldImage;
        }

        let body = {
            name: name,
            email: email,
            username: email,
            telephone: telephone,
            birth_date: birth_date,
            profile_image: profile_image,
            bio: bio
        };

        await updateProfile(token, body);

        setIsLoading(false);
        window.location.reload();
    };

    const handleProfileImage = async (e) => {
        setIsLoading(true);
        let file = e.target.files[0];
        let imageBase64 = await fileToBase64(file);
        setProfileImage(imageBase64);
        setFieldImage(imageBase64);
        setIsLoading(false);
    };
    console.log(fieldBio);
    return (
        <>
            <Modal onClose={onClose}>
                <h1 className="postModalText">Bem Vindo! {fieldName}</h1>
                <div className="profileModal">
                    <div className="profileContent">
                        <div className="profileDiv">
                            <div className="profileInputDiv">
                                <label className="profileInputLabel">Nome:</label>
                                <input
                                    className="profileInput"
                                    defaultValue={fieldName}
                                    title="Nome"
                                    placeholder="Nome"
                                    onChange={(e) => setFieldName(e.target.value)}
                                />
                            </div>
                            <div className="profileInputDiv">
                                <label className="profileInputLabel">Email:</label>
                                <input
                                    className="profileInput"
                                    defaultValue={fieldEmail}
                                    type="email"
                                    title="Email"
                                    placeholder="Email"
                                    onChange={(e) => setFieldEmail(e.target.value)}
                                />
                            </div>
                            <div className="profileInputDiv">
                                <label className="profileInputLabel">Telefone:</label>
                                <input
                                    className="profileInput"
                                    defaultValue={fieldTel}
                                    type="tel"
                                    pattern="[0-9]{2} [0-9]{5}-[0-9]{4}"
                                    title="Telefone"
                                    placeholder="Telefone"
                                    onChange={(e) => setFieldTel(e.target.value)}
                                />
                            </div>
                            <div className="profileInputDiv">
                                <label className="profileInputLabel">Nascimento:</label>
                                <input
                                    id="profileBirthDate"
                                    defaultValue={fieldBirth}
                                    type="date"
                                    title="Data de Nascimento"
                                    placeholder="Data de Nascimento"
                                    onChange={(e) => setFieldBirth(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="profileDiv">
                            <input
                                id="profileImageInput"
                                onChangeCapture={(e) => {
                                    handleProfileImage(e);
                                }}
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg,image/jpg"
                            />
                            <label
                                htmlFor="profileImageInput"
                                style={{ cursor: "pointer" }}
                            >
                                <img id="profileImage" src={profileImage} />
                            </label>
                        </div>
                    </div>
                    <button onClick={() => { onClose(); onChangePassword() }} style={{ backgroundColor: highlightColor, marginRight: "auto", marginLeft: "9vw" }} className="createQuestModalButton">
                        Mudar senha
                    </button>
                    <label className="profileBioLabel">Biografia:</label>
                    <textarea onChange={(e) => { setFieldBio(e.target.value) }} className={"profileBio"}>{fieldBio}</textarea>
                    <div className="createQuestModalButtons">
                        <button onClick={onClose} style={{ backgroundColor: highlightColor, marginLeft: "auto" }} className="createQuestModalButton">
                            Cancelar
                        </button>
                        <button onClick={handleProfileUpdate} style={{ backgroundColor: highlightColor }} className="createQuestModalButton">
                            Salvar
                            <span className="material-icons">
                                save
                            </span>
                        </button>
                    </div>
                </div>
            </Modal>
            <LoadingComponent isOpen={isLoading} />
        </>
    );

}

export default Profile;