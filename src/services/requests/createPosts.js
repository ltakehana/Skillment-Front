import api from '../api';

const createPosts = async (token,userId,message) => {
  let response = null;
  try {
    response = await api.post("/post",
        {
            message:message,
            is_reply:false,
            author_id:userId
        },
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

export default createPosts;