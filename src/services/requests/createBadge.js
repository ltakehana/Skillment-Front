import api from '../api';

const createBadge = async (token,name,description,icon) => {
  let response = null;
  try {
    response = await api.post("/badge",
        {
            name:name,
            type:0,
            goal:10,
            icon:icon,
            description:description
        },
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

export default createBadge;