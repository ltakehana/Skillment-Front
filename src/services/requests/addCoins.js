import api from '../api';

const addCoins = async (token,body) => {
  let response = null;
  try {
    response = await api.post("/addPoints",body,
      { 
        headers: {
          Authorization: `${token}`,
        }
      });
      return response.data;
  } catch (error) {
    return (error.response.data);
  }
};

export default addCoins;