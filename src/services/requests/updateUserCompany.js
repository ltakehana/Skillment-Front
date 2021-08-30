import api from '../api';

const updateUserCompany = async (companyId, userId, body, token) => {
  try {
    const response = await api.put(`/companyUsers/${companyId}/${userId}`, body, {
      headers: {
        Authorization: `${token}`,
      }
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

export default updateUserCompany;
