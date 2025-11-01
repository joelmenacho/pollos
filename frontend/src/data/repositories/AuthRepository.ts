import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { AuthApi } from '../api/AuthApi';
import { http } from '../api/client';

export class AuthRepository implements IAuthRepository {
  async login(email: string, password: string) {
    const data = await AuthApi.login(email, password);
    if (data?.token) http.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    return data;
  }
}
