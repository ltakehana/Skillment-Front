import api from '../api';

const getCompanyUsers = async (token,company_id) => {
  let response = null;
  try {
    response = await api.get("/companyUsers/"+company_id,
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

export default getCompanyUsers;