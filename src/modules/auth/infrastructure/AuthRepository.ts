import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { Auth } from '../domain/Auth';
import { AuthRepository } from '../domain/AuthRepository';
import { StorageRepository } from '@/modules/storage/domain/StorageRepository';

const API_URL = process.env.EXPO_PUBLIC_EMT_API_URL;

export function generateAuthRepository(
  clientRepository: ClientRepository,
  storageRepository: StorageRepository
): AuthRepository {
  return {
    login: async (): Promise<Auth> => {
      const auth = await storageRepository.get<Auth>('auth');

      if (!auth?.accessToken) {
        const res = await clientRepository.get<Auth>(
          API_URL + `/mobilitylabs/user/login/`
        );

        return res;
      }

      return auth;
    },
  };
}
