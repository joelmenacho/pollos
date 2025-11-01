import { User } from '../entities/User';

export interface IAuthRepository {
  login(email: string, password: string): Promise<{ user: User; token: string }>;
}
