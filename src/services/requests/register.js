import api from '../api';

const register = async (body) => {
  let response = null;
  try {
    response = await api.post("/register",body, {});
    if(response.data){
        alert("Cadastro concluído com sucesso");
    }
    return response.data;
  } catch (error) {
    alert("Cadastro não concluído concluído");
    return (error);
  }
};

export default register;
