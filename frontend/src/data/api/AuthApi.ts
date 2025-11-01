import { http } from './client';
export const AuthApi = {
  login: (email: string, password: string) =>
    http.post('/auth/login', { email, password }).then(r => r.data),
};
