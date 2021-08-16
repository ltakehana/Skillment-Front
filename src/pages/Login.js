import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../assets/Marca_Negativo_Cor2.png"
import '../styles/pages/login.css';
import auth from '../services/requests/auth';


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await auth(email, password);
      if (response.token) {
        history.push('/');
      } else {
        alert("Email ou senha incorretos, por favor tente novamente!");
      }
    } catch (error) {
      alert("Email ou senha incorretos, por favor tente novamente!");
       console.error(error);
    }
  };


  return (
    <div className="login-container">
      <section className="panel" style={{background:"white"}}>
        <img className="logo" src={Logo} alt="Logo" />
      </section>
      <section className="login-form-container">
        <h1 className="login-title">Inicie sua sessão</h1>
        <div className="login-form">
          <h3 className="login-email">Email</h3>
          <input
            type="text"
            className="login-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="login-password">Senha</h3>
          <input
            type="password"
            className="login-input"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h4 className="login-password" style={{cursor:"pointer"}} onClick={()=>{history.push("/reset_password")}}>Esqueceu sua senha?</h4>
          <button
            className="login-button"
            type="button"
            onClick={handleSignIn}
          >
            Entrar
          </button>
        </div>
      </section>
    </div>
  );
};

export default Login;
