import api from '../api';

const getPosts = async (token) => {
  let response = null;
  try {
    response = await api.get("/posts",
      { 
        headers: {
          Authorization: `${token}`,
        }
      });
      return response.data;
  } catch (error) {
    return ([]);
  }
};

export default getPosts;