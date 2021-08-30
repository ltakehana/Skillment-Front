import api from '../api';

const registerRequest = async (body) => {
  let response = null;
  try {
    response = await api.post("/reset_password",body);
      return response.data.message;
  } catch (error) {
    return false;
  }
};

export default registerRequest;