import api from '../api';

const updateCompany = async (token,companyId,body) => {
  let response = null;
  try {
    response = await api.put("/company/"+companyId,body,
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

export default updateCompany;