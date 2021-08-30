import api from '../api';

const registerRequest = async (token,body) => {
  let response = null;
  try {
    response = await api.post("/registerRequest",body,
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

export default registerRequest;