import axios from 'axios';
import { API_URL } from '../config';

export const http = axios.create({ baseURL: API_URL });

// Si luego usas JWT:
// http.interceptors.request.use((config) => {
//   const token = /* lee de storage */ '';
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
