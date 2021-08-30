import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from "../assets/Marca_Negativo_Cor2.png"
import register from '../services/requests/register';
import '../styles/pages/login.css';
import LoadingComponent from '../components/LoadingComponent';

const Register = (props) => {

  const history = useHistory();

  const registerToken = props.match.params.registerToken;

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    if (password === passwordConfirmation) {
      const body = {
        registerToken: registerToken,
        name: name,
        password: password,
        birthDate: birthDate
      }
      const response = await register(body);
      if (response)
        history.push("/login");

    }
    else {
      alert("As senhas não conferem!");
    }
    setIsLoading(false);
  };


  return (
    <div className="login-container">
      <section className="login-form-container">
        <h1 className="login-title" style={{ marginBottom: "1rem" }}>Cadastro</h1>
        <div className="login-form">
          <h3 className="login-email">Nome</h3>
          <input
            type="text"
            className="login-input"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />

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

          <h3 className="login-password">Data de Nascimento</h3>
          <input
            type="date"
            className="login-input"
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <button
            className="login-button"
            type="button"
            onClick={handleSignUp}
          >
            Registrar
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

export default Register;
