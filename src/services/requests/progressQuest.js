import api from '../api';

const progressQuest = async (token,body) => {
  let response = null;
  try {
    response = await api.post("/progressQuest",body,
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

export default progressQuest;