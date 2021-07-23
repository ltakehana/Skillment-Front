import api from '../api';

const dislikePost = async (token,postId) => {
  let response = null;
  try {
    response = await api.delete("/likePost/"+postId,
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

export default dislikePost;