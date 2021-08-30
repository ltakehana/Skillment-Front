import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../assets/LogoUsbea.jpeg"
import '../styles/pages/login.css';
import auth from '../services/requests/auth';
import LoadingComponent from '../components/LoadingComponent';


const LoginYA21 = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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
      <LoadingComponent isOpen={isLoading} />
    </div>
  );
};

export default LoginYA21;
