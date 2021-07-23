import api from '../api';

const createCoin = async (token,name,description,icon) => {
  let response = null;
  try {
    response = await api.post("/points",
        {
            name:name,
            icon:icon,
            rules: "11111",
            filters: "0",
            mode: "0",
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

export default createCoin;