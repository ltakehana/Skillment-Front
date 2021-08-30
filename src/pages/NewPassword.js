import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../assets/Marca_Negativo_Cor2.png"
import updateProfile from '../services/requests/updateProfile';
import LoadingComponent from '../components/LoadingComponent';
import '../styles/pages/login.css';


const NewPassword = (props) => {

  const history = useHistory();

  const userToken = props.match.params.userToken;

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    if (password === passwordConfirmation) {
      const body = {
        password: password
      }
      const response = await updateProfile(userToken, body);
      if (response.indexOf("has been updated successfully") > -1) {
        alert("Alteração de senha concluída com sucesso!")
        history.push("/login");
      }
      else {
        alert("Algo de estranho ocorreu, contate os admnistradores!");
      }
    }
    else {
      alert("As senhas não conferem!");
    }
    setIsLoading(true);
  };


  return (
    <div className="login-container">
      <section className="login-form-container">
        <h1 className="login-title" style={{ marginBottom: "1rem" }}>Informe sua nova senha</h1>
        <div className="login-form">
          <h3 className="login-password">Senha</h3>
          <input
            type="password"
            className="login-input"
            placeholder="*********"
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className="login-password">Confirme sua senha</h3>
          <input
            type="password"
            className="login-input"
            placeholder="*********"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <button
            className="login-button"
            type="button"
            onClick={handleSignUp}
          >
            Enviar
          </button>
        </div>
      </section>
      <section className="panel" style={{ background: "white" }}>
        <img className="logo" src={Logo} alt="Logo" />
      </section>
      <LoadingComponent isOpen={isLoading} />
    </div>
  );
};

export default NewPassword;
