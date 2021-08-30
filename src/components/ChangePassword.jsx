import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import LoadingComponent from './LoadingComponent';
import "../styles/components/profile.css"
import getUser from '../services/requests/getUser';
import { useHistory } from 'react-router';
import Auth from '../services/requests/auth';
import getCompany from '../services/requests/getCompany';
import updateProfile from '../services/requests/updateProfile';


function ChangePassword({ onClose }) {

    const history = useHistory();

    const [highlightColor, setHighlightColor] = useState("#C7C7C7");
    const [email, setEmail] = useState("");
    const [fieldPassword, setFieldPassword] = useState("");
    const [fieldNewPassword, setFieldNewPassword] = useState("");
    const [fieldConfirmPassword, setFieldConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
            history.push("/login")
        }
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (!userInfo) {
            userInfo = await getUser(userToken);
        }
        setEmail(userInfo.email);
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if (!companyInfo) {
            companyInfo = await getCompany(userToken);
        }
        setHighlightColor(companyInfo.first_color);

        setIsLoading(false);
    }, []);

    const handleProfileUpdate = async () => {
        setIsLoading(true);

        const response = await Auth(email, fieldPassword);
        if (response.token) {
            if (fieldNewPassword !== "" && fieldNewPassword === fieldConfirmPassword) {
                let body = {
                    password: fieldNewPassword
                };

                const updateResponse = await updateProfile(response.token, body);
                if (updateResponse) {
                    sessionStorage.clear();
                    alert("Senha redefinida com sucesso! Logue novamente!");
                    window.location.reload();
                }
                else {
                    alert("Algum erro ocorreu, tente novamente mais tarde");
                }
            }
            else {
                alert("Um erro ocorreu! Verifique se as senhas conferem!");
            }
        } else {
            alert("Um erro ocorreu! Verifique sua senha atual e tente novamente.");
            return (0);
        }
        setIsLoading(false);
    }
    
    return (
        <>
            <Modal onClose={onClose}>
                <h1 className="postModalText" style={{ marginBottom: "5vh" }}>Mudar Senha</h1>
                <div style={{ width: "50vw", display: "flex", flexDirection: "column" }}>
                    <div style={{ width: "45vw", margin: "auto", display: "flex", flexDirection: "column" }}>
                        <div className="profileDiv" style={{ margin: "auto" }}>
                            <div className="profileInputDiv">
                                <label className="profileInputLabel">Senha atual:</label>
                                <input
                                    className="profileInput"
                                    title="Senha atual"
                                    placeholder="*******"
                                    type="password"
                                    onChange={(e) => setFieldPassword(e.target.value)}
                                />
                            </div>
                            <div className="profileInputDiv">
                                <label className="profileInputLabel">Nova senha:</label>
                                <input
                                    className="profileInput"
                                    type="password"
                                    title="Nova senha"
                                    placeholder="*******"
                                    onChange={(e) => setFieldNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="profileInputDiv">
                                <label className="profileInputLabel">Confirme sua senha:</label>
                                <input
                                    className="profileInput"
                                    type="password"
                                    title="Confirme sua nova senha"
                                    placeholder="*******"
                                    onChange={(e) => setFieldConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
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
            <LoadingComponent isOpen={isLoading}/>
        </>
    );

}

export default ChangePassword;