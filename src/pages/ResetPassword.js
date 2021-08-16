import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../assets/Marca_Negativo_Cor2.png"
import RequestResetPassword from '../services/requests/requestResetPassword';
import '../styles/pages/login.css';


const ResetPassword = (props) => {

  const history = useHistory();


  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    const body={
        email:email
    }
    const response = await RequestResetPassword(body);
    if(response=="Email has been sended"){
        alert("Solicitação realizada com sucesso!\nConfira seu email.")
        history.push("/login");
    }
    else{
        alert("Algo de estranho ocorreu, contate os admnistradores!")
    }
  
  };


  return (
    <div className="login-container">
    <section className="login-form-container">
    <h1 className="login-title" style={{marginBottom:"1rem"}}>Recuperar senha</h1>
    <div className="login-form">
      <h3 className="login-email">Email</h3>
      <input
        type="text"
        className="login-input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
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
      <section className="panel" style={{background:"white"}}>
        <img className="logo" src={Logo} alt="Logo" />
      </section>
      
    </div>
  );
};

export default ResetPassword;
