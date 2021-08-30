import api from '../api';

const getCoins = async (token) => {
  let response = null;
  try {
    response = await api.get("/points",
      { 
        headers: {
          Authorization: `${token}`,
        }
      });
      return response.data;
  } catch (error) {
    return false;
  }
};

export default getCoins;