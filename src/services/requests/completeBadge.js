import api from '../api';

const completeBadge = async (token,body) => {
  let response = null;
  try {
    response = await api.post("/completeBadge",body,
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

export default completeBadge;