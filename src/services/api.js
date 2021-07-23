import { create } from 'axios';

const api = create({
  baseURL: 'http://api.skillment.com.br/',
});

export default api;
