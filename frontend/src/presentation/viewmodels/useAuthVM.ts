import { useState } from 'react';
import { LoginUseCase } from '../../domain/usecases/LoginUseCase';
import { AuthRepository } from '../../data/repositories/AuthRepository';

const authRepo = new AuthRepository();
const loginUC = new LoginUseCase(authRepo);

export function useAuthVM() {
  const [token, setToken] = useState<string|null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user, token } = await loginUC.execute(email, password);
      setUser(user); setToken(token);
      return { user, token };
    } finally { setLoading(false); }
  };

  const logout = () => { setUser(null); setToken(null); };

  return { user, token, loading, login, logout };
}
