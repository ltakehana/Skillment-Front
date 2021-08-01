import api from '../api';

const getCompany = async (token) => {
  let response = null;
  try {
    response = await api.get("/company",
      { 
        headers: {
          Authorization: `${token}`,
        }
      });
      sessionStorage.setItem('companyInfo', JSON.stringify(response.data));
      return response.data;
  } catch (error) {
    return (error);
  }
};

export default getCompany;
