import api from '../api';

const Auth = async (username, password) => {
  let response = null;
  try {
    response = await api.get("/login",
      { 
        auth: { 
          "username":username,
           "password":password 
        } 
      });
    if (response.data.token) {
      sessionStorage.setItem('userToken', `Bearer ${response.data.token}`);
      sessionStorage.setItem('userTokenExpiration', response.data.expiration);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    return false;
  }
};

export default Auth;