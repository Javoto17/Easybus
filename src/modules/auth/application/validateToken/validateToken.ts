import { AuthRepository } from '../../domain/AuthRepository';

export async function validateToken(authRepository: AuthRepository): Promise<boolean> {
  return authRepository.validateToken();
}
