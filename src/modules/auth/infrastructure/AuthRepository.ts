import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { Auth } from '../domain/Auth';
import { AuthRepository } from '../domain/AuthRepository';
import { StorageRepository } from '@/modules/storage/domain/StorageRepository';

const API_URL = process.env.EXPO_PUBLIC_EMT_API_URL;

const DEFAULT_HEADERS = {
  passkey: process.env.EXPO_PUBLIC_EMT_PASSKEY ?? '',
  'X-ClientId': process.env.EXPO_PUBLIC_EMT_CLIENT_ID ?? '',
};

interface LoginResponse {
  code: string;
  description: string;
  datetime: string;
  data: Auth[];
}

export function generateAuthRepository(
  clientRepository: ClientRepository,
  storageRepository: StorageRepository
): AuthRepository {
  return {
    login: async (): Promise<boolean> => {
      const auth = await storageRepository.get<string>('auth');

      if (!auth) {
        const res = await clientRepository.get<LoginResponse>(
          API_URL + `/mobilitylabs/user/login/`,
          {
            headers: DEFAULT_HEADERS,
          }
        );

        const data = res?.data?.[0];

        storageRepository.set('auth', data?.accessToken);
      }

      return !!auth;
    },
  };
}
