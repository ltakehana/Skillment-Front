import api from '../api';

const getCoin = async (token,coinId) => {
  let response = null;
  try {
    response = await api.get("/points/"+coinId,
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

export default getCoin;