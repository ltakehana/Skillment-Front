import api from '../api';

const getQuests = async (token) => {
  let response = null;
  try {
    response = await api.get("/quests",
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

export default getQuests;