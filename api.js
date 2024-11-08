
import axios from 'axios';
// import store from './redux/store';

const api = axios.create({
  baseURL: 'https://ipost-api.onrender.com',
});

// api.interceptors.request.use(
//   (config) => {
//     // Verifica que la URL no contenga "accounts" antes de agregar el token
//     if (!config.url.includes('/accounts')) {
//       const { access_token } = store.getState().profile.access_token;
//       console.log(access_token)
//       if (access_token) {
//         config.headers.Authorization = `Bearer ${access_token}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
