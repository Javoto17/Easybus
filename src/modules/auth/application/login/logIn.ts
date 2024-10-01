import { Auth } from '../../domain/Auth';
import { AuthRepository } from '../../domain/AuthRepository';

export async function login(loginRepository: AuthRepository): Promise<Auth> {
  return loginRepository.login();
}
