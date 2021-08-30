import api from '../api';

const getBadges = async (token) => {
  let response = null;
  try {
    response = await api.get("/badges",
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

export default getBadges;