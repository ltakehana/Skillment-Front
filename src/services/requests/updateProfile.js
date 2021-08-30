import api from '../api';

const updateProfile = async (token,body) => {
  let response = null;
  try {
    response = await api.put("/user",body,
      { 
        headers: {
          Authorization: `${token}`,
        }
      });
      return response.data.message;
  } catch (error) {
    return false;
  }
};

export default updateProfile;