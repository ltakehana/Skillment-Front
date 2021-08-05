import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../assets/Logo_Instituto Embraer-19.png"
import '../styles/pages/login.css';
import auth from '../services/requests/auth';


const LoginEmbraer = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123');

  const handleSignIn = async () => {
    try {
      const response = await auth(email, password);
      if (response.result !== null) {
        history.push('/');
      } else {
        alert(response.mensagem);
        return (0);
      }
    } catch (error) {
       console.error(error);
    }
  };


  return (
    <div className="login-container">
      <section className="panel" style={{background:"#E6E7E8"}}>
        <img className="logo" src={Logo} alt="Logo" />
      </section>
      <section className="login-form-container" style={{background:"#0176C6"}}>
        <h1 className="login-title" style={{color:"#E6E7E8"}}>Inicie sua sessão</h1>
        <div className="login-form">
          <h3 className="login-email" style={{color:"#E6E7E8"}}>Email</h3>
          <input
            type="text"
            className="login-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="login-button"
            type="button"
            style={{backgroundColor:"#E6E7E8",color:"#0176C6"}}
            onClick={handleSignIn}
          >
            Entrar
          </button>
        </div>
      </section>
    </div>
  );
};

export default LoginEmbraer;
