import { IAuthRepository } from '../repositories/IAuthRepository';
export class LoginUseCase {
  constructor(private repo: IAuthRepository) {}
  execute(email: string, password: string) {
    return this.repo.login(email, password);
  }
}
