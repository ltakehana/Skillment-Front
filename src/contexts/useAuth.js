import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import auth from '../services/requests/auth';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const history = useHistory();

  useEffect(() => {
    async function loadStoragedData() {
      const storagedToken = await sessionStorage.getItem('userToken');
      if (storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setToken(`Bearer ${storagedToken}`);
      }
    }
    loadStoragedData();
  }, []);

  const signIn = async (username, password) => {
    try {
      const response = await auth(username, password);
      if (response.result !== null) {
        api.defaults.headers.Authorization = `Bearer ${response.result}`;
        setToken(`Bearer ${response.result}`);
        history.push('/');
      } else {
        alert(response.mensagem);
        return (0);
      }
    } catch (error) {
       console.error(error);
    }
  };

  const signOut = async () => {
    sessionStorage.clear();
    await history.push("/login")
    window.location.reload();
  };
  return (
    <AuthContext.Provider
      value={{
        signed: !!token,
        token,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
