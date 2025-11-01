import axios from 'axios';
import { API_URL } from '../../config';

export const http = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

http.interceptors.response.use(
  (r) => r,
  (e) => {
    const msg = e?.response?.data?.message || 'Error de red';
    return Promise.reject(new Error(msg));
  }
);
