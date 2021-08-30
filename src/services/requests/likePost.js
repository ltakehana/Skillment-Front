import api from '../api';

const likePost = async (token,postId) => {
  let response = null;
  try {
    response = await api.post("/likePost/"+postId,{},
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

export default likePost;