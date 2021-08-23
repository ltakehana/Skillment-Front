import { create } from 'axios';

const api = create({
  baseURL: 'https://api.skillment.com.br/',
});

export default api;
  