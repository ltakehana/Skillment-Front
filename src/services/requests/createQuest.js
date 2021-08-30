import api from '../api';

const createQuest = async (token,quest) => {
  let response = null;
  try {
    response = await api.post("/quest",
        quest,
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

export default createQuest;