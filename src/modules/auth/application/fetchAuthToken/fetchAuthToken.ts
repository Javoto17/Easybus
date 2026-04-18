import { AuthRepository } from '../../domain/AuthRepository';

export interface AuthToken {
  token: string;
  expiresAt: Date;
}

export async function fetchAuthToken(
  authRepository: AuthRepository
): Promise<AuthToken> {
  const success = await authRepository.login();
  if (!success) throw new Error('Authentication failed');

  const token = await authRepository.getToken();
  const expiresAt = await authRepository.getExpiresAt();

  if (!token || !expiresAt) throw new Error('Token missing after login');

  return { token, expiresAt };
}
