import { AuthRepository } from '../../domain/AuthRepository';

export async function logout(authRepository: AuthRepository): Promise<boolean> {
  return authRepository.logout();
}
