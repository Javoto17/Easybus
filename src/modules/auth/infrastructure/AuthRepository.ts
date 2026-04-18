import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { StorageRepository } from '@/modules/storage/domain/StorageRepository';

import { Auth } from '../domain/Auth';
import { AuthRepository } from '../domain/AuthRepository';

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

interface WhoamiResponse {
  code: string;
  description: string;
  datetime: string;
  data: Auth[];
}

interface LogoutResponse {
  code: string;
  description: string;
  datetime: string;
  data: unknown[];
}

export function generateAuthRepository(
  clientRepository: ClientRepository,
  storageRepository: StorageRepository
): AuthRepository {
  return {
    login: async (): Promise<boolean> => {
      const auth = await storageRepository.get<string>('auth');
      const dateTokenExpirationStorage =
        await storageRepository.get<string>('tokenSecExpiration');

      let isLogged = false;

      if (
        !!dateTokenExpirationStorage &&
        typeof dateTokenExpirationStorage === 'string'
      ) {
        isLogged = !!auth && new Date(dateTokenExpirationStorage) > new Date();
      }

      if (!isLogged) {
        const res = await clientRepository.get<LoginResponse>(
          API_URL + `/mobilitylabs/user/login/`,
          {
            headers: DEFAULT_HEADERS,
          }
        );

        const data = res?.data?.[0];

        if (!data?.accessToken) {
          return false;
        }

        let dateTokenExpiration = new Date();

        dateTokenExpiration.setSeconds(
          dateTokenExpiration.getSeconds() + Number(data?.tokenSecExpiration)
        );

        await storageRepository.set('auth', data?.accessToken);
        await storageRepository.set(
          'tokenSecExpiration',
          dateTokenExpiration.toISOString()
        );

        return true;
      }

      return true;
    },
    logout: async (): Promise<boolean> => {
      const auth = await storageRepository.get<string>('auth');

      if (!auth) {
        return true;
      }

      try {
        await clientRepository.get<LogoutResponse>(
          API_URL + `/mobilitylabs/user/logout/`,
          {
            headers: {
              accessToken: auth,
            },
          }
        );
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        await storageRepository.delete('auth');
        await storageRepository.delete('tokenSecExpiration');
      }

      return true;
    },
    validateToken: async (): Promise<boolean> => {
      const auth = await storageRepository.get<string>('auth');

      if (!auth) {
        return false;
      }

      try {
        const res = await clientRepository.get<WhoamiResponse>(
          API_URL + `/mobilitylabs/user/whoami/`,
          {
            headers: {
              accessToken: auth,
            },
          }
        );

        return res.code === '02' || res.code === '00';
      } catch (error) {
        return false;
      }
    },
    getToken: async (): Promise<string | null> => {
      return storageRepository.get<string>('auth');
    },
    getExpiresAt: async (): Promise<Date | null> => {
      const expiresAtStr = await storageRepository.get<string>('tokenSecExpiration');
      if (!expiresAtStr) return null;
      return new Date(expiresAtStr);
    },
  };
}
