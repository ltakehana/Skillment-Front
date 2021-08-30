import api from '../api';

const getUser = async (token) => {
  let response = null;
  try {
    response = await api.get("/user",
      { 
        headers: {
          Authorization: `${token}`,
        }
      });
      sessionStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
  } catch (error) {
    return false;
  }
};

export default getUser;
