import { http } from './client';
export const ProductApi = {
  list: () => http.get('/products').then(r => r.data),
  get:  (id: string) => http.get(`/products/${id}`).then(r => r.data),
};
