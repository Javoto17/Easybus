import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { Login } from '../domain/Login';
import { LoginRepository } from '../domain/LoginRepository';

const API_URL = process.env.EXPO_PUBLIC_EMT_API_URL;

export function generateLoginRepository(
  clientRepository: ClientRepository
): LoginRepository {
  return {
    login: async (): Promise<Login> => {
      console.log('api', API_URL);

      const res = await clientRepository.get(
        API_URL + `/mobilitylabs/user/login/`
      );

      console.log('res', res);

      return res;
    },
  };
}
