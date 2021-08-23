import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import ErrorModal from "../components/ErrorModal";
import "../styles/pages/players.css";
import { useHistory } from "react-router-dom";
import getCompanyUsers from "../services/requests/getCompanyUsers";
import getUser from "../services/requests/getUser";
import getCompany from "../services/requests/getCompany";
import PlusButton from "../components/PlusButton";
import Modal from "../components/Modal";
import defaultImage from "../assets/accountCircle.svg";
import editIcon from "../assets/editIcon.svg";
import externalLinks from "../utils/externalLinks";

import registerRequest from "../services/requests/registerRequest";
import LoadingComponent from "../components/LoadingComponent";

function Players() {
  const history = useHistory();

  const [playersList, setPlayersList] = useState([]);

  const [backgroundColor, setBackgroundColor] = useState("#C7C7C7");
  const [highlightColor, setHighlightColor] = useState("#C7C7C7");

  const [addPlayer, setAddPlayer] = useState(false);
  const [editPLayer, setEditPlayer] = useState(false);
  const [isOnError, setIsOnError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [playerEmailInput, setPlayerEmailInput] = useState("");
  const [playerOfficeInput, setPlayerOfficeInput] = useState("");
  const [privilegesField, setPrivilegesField] = useState("0000000000");
  const [mouseXPosition, setMouseXPosition] = useState(0.0);
  const [mouseYPosition, setMouseYPosition] = useState(0.0);

  const [admin, setAdmin] = useState(false);
  const [privilleges, setPrivilleges] = useState("0000000000");

  const handleRegisterRequest = async () => {
      try {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
          history.push("/login");
        }
    
        let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
        if (!companyInfo) {
          companyInfo = await getCompany(userToken);
        }
    
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (!userInfo) {
          userInfo = await getUser(userToken);
        }
    
        const body = {
          email: playerEmailInput,
          office: playerOfficeInput,
          author_id: userInfo.id,
          privileges: privilegesField,
          company: companyInfo.name,
        };
    
        await registerRequest(userToken, body);
        setAddPlayer(false);
        setIsLoading(false);
        window.location.reload();
      } catch (error) {
          console.log(error);
      }
  };

  const handleEditRequest = async () => {
    try {
      const userToken = sessionStorage.getItem("userToken");
      if (!userToken) {
        history.push("/login");
      }

      let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
      if (!companyInfo) {
        companyInfo = await getCompany(userToken);
      }

      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo) {
        userInfo = await getUser(userToken);
      }

      const body = {
        office: playerOfficeInput,
        author_id: userInfo.id,
        privileges: privilegesField,
        company: companyInfo.name,
      };

      console.log("Adicionar requisição");
      //   await updateProfile(userToken, body);
      setEditPlayer(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModifyPrivileges = (check, position) => {
    let privilegesHandle = "";
    for (let i = 0; i < privilegesField.length; i++) {
      if (i === position) {
        if (check) {
          privilegesHandle += "1";
        } else {
          privilegesHandle += "0";
        }
      } else {
        privilegesHandle += privilegesField.charAt(i);
      }
    }
    setPrivilegesField(privilegesHandle);
  };

  useEffect(async () => {
    setIsLoading(true);
    const userToken = sessionStorage.getItem("userToken");
    if (!userToken) {
      history.push("/login");
    }
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo) {
      userInfo = await getUser(userToken);
    }
    let companyInfo = JSON.parse(sessionStorage.getItem("companyInfo"));
    if (!companyInfo) {
      companyInfo = await getCompany(userToken);
    }
    setBackgroundColor(companyInfo.second_color);
    setHighlightColor(companyInfo.first_color);

    if (companyInfo.privilleges) {
      if (userInfo.admin || companyInfo.privilleges[1] === "1") {
        setAdmin(true);
        setPrivilleges(companyInfo.privilleges);
      } else setAdmin(false);
    }

    const companyUsers = await getCompanyUsers(
      userToken,
      userInfo.selected_company
    );
    setPlayersList(companyUsers);
    setIsLoading(false);
  }, []);

  return (
    <div className="mainFrame" style={{ backgroundColor: backgroundColor }}>
      <LoadingComponent isOpen={isLoading} />
      <div className="mainBody">
        <Menu selectedMenu={3}></Menu>
        <div className="mainContent">
          <div className="playersFrame">
            <div className="playersTitle">
              <h1>Players</h1>
            </div>
            <div className="playersList">
              <table className="playersTable">
                {playersList.map((player, index) => (
                  <tr>
                    <td className="playerIconColumn">
                      <img
                        style={{ borderRadius: "40vw" }}
                        src={
                          player.picture === ""
                            ? defaultImage
                            : externalLinks.userPic + player.picture
                        }
                        className="playerIcon"
                      />
                    </td>
                    <td className="playerNameColumn">
                      <label className="playerName">{player.name}</label>
                    </td>
                    <td className="playerCompanyColumn">
                      <label className="playerCompany">
                        {player.company_name}
                      </label>
                    </td>
                    <td className="playerOfficeColumn">
                      <label className="playerOffice">{player.office}</label>
                    </td>
                    <td className="playerEmailColumn">
                      <label className="playerEmail">{player.email}</label>
                    </td>
                    {admin && (
                      <td className="playerOptionsColumn">
                        <div className="homePostOptions">
                          <span
                            className="material-icons"
                            onMouseOver={(e) => {
                              setMouseXPosition(MouseEvent.pageX);
                              setMouseYPosition(e.clientY);
                            }}
                          >
                            more_vert
                          </span>
                          <div
                            className="homePostDropdown"
                            style={{
                              top: mouseYPosition,
                              left: mouseXPosition,
                            }}
                          >
                            <div className="NavbarUserDropdownItem">
                              <span className="material-icons NavbarUserDropdownIcon">
                                info
                              </span>
                              <span className="NavbarUserDropdownText">
                                Informações
                              </span>
                            </div>
                            <div
                              onClick={() => setEditPlayer(true)}
                              className="NavbarUserDropdownItem"
                            >
                              <span className="material-icons NavbarUserDropdownIcon">
                                edit
                              </span>
                              <span className="NavbarUserDropdownText">
                                Editar usuário
                              </span>
                            </div>
                            <div className="NavbarUserDropdownItem">
                              <span className="material-icons NavbarUserDropdownIcon">
                                block
                              </span>
                              <span className="NavbarUserDropdownText">
                                Desligar usuário
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Navbar></Navbar>
      {admin && (
        <PlusButton
          onClickFunction={() => {
            setAddPlayer(true);
          }}
        />
      )}
      {editPLayer && (
        <Modal onClose={() => setEditPlayer(false)}>
          <section className="createBadgeModal">
            <h1 className="createBadgeModalText">
              Editar Usuário
              <img
                className="createBadgeModalTextIcon"
                src={editIcon}
                alt="edit"
              />
            </h1>

            <div className="createBadgeModalSubText">Cargo</div>
            <input
              onChange={(e) => setPlayerOfficeInput(e.target.value)}
              placeholder="Cargo do usuário"
              className="createBadgeModalName"
            />
            <div className="createBadgeModalSubText">Permissões</div>
            {privilleges[0] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditCompany"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 0);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditCompany"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar empresa
                </label>
              </div>
            )}
            {privilleges[1] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditUsers"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 1);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditUsers"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar usuários
                </label>
              </div>
            )}
            {privilleges[2] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditCoins"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 2);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditCoins"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar moedas
                </label>
              </div>
            )}
            {privilleges[3] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditBadges"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 3);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditBadges"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar insígnias
                </label>
              </div>
            )}
            {privilleges[4] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditQuests"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 4);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditQuests"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar missões
                </label>
              </div>
            )}
            <div className="createBadgeModalButtons">
              <button
                onClick={() => setEditPlayer(false)}
                style={{ backgroundColor: highlightColor, marginLeft: "auto" }}
                className="createBadgeModalButton"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditRequest}
                style={{ backgroundColor: highlightColor }}
                className="createBadgeModalButton"
              >
                Salvar
                <span className="material-icons">save</span>
              </button>
            </div>
          </section>
        </Modal>
      )}
      {addPlayer && (
        <Modal
          onClose={() => {
            setAddPlayer(false);
          }}
        >
          <div className="createBadgeModal">
            <h1 className="createBadgeModalText">Adicionar usuário</h1>
            <input
              onChange={(e) => setPlayerEmailInput(e.target.value)}
              placeholder="Email do usuário"
              className="createBadgeModalName"
            />
            <input
              onChange={(e) => setPlayerOfficeInput(e.target.value)}
              placeholder="Cargo do usuário"
              className="createBadgeModalName"
            />
            {privilleges[0] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditCompany"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 0);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditCompany"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar empresa
                </label>
              </div>
            )}
            {privilleges[1] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditUsers"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 1);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditUsers"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar usuários
                </label>
              </div>
            )}
            {privilleges[2] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditCoins"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 2);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditCoins"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar moedas
                </label>
              </div>
            )}
            {privilleges[3] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditBadges"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 3);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditBadges"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar insígnias
                </label>
              </div>
            )}
            {privilleges[4] === "1" && (
              <div style={{ display: "flex" }} className="createBadgeModalText">
                <input
                  id="canEditQuests"
                  onChange={(e) => {
                    handleModifyPrivileges(e.target.checked, 4);
                  }}
                  type="checkbox"
                  className="playerCheckbox"
                />
                <label
                  htmlFor="canEditQuests"
                  style={{
                    margin: "auto",
                    marginLeft: "1vw",
                    cursor: "pointer",
                  }}
                >
                  Usuário pode editar missões
                </label>
              </div>
            )}
            <div className="createBadgeModalButtons">
              <button
                onClick={() => {
                  setAddPlayer(false);
                }}
                style={{ backgroundColor: highlightColor, marginLeft: "auto" }}
                className="createBadgeModalButton"
              >
                Cancelar
              </button>
              <button
                onClick={handleRegisterRequest}
                style={{ backgroundColor: highlightColor }}
                className="createBadgeModalButton"
              >
                Salvar
                <span className="material-icons">save</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      <ErrorModal isOpen={isOnError} onClose={() => setIsOnError(false)} />
    </div>
  );
}

export default Players;
