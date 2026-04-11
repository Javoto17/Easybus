import { AuthRepository } from '../../domain/AuthRepository';

export async function getToken(
  authRepository: AuthRepository
): Promise<string | null> {
  return authRepository.getToken();
}
