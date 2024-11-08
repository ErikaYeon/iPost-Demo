
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ipost-api.onrender.com',
});

export default api;
