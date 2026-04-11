import { Auth } from '@/modules/auth/domain/Auth';
import { StorageRepository } from '@/modules/storage/domain/StorageRepository';

import { ClientRepository } from '../domain/ClientRepository';

export const generateClientRepository = (
  storageRepository: StorageRepository
): ClientRepository => {
  return {
    get: (url, options) => get(url, options, storageRepository),
    post: (url, data, options) => post(url, data, options, storageRepository),
  };
};

async function get<T>(
  url: string,
  options: RequestInit = {},
  storageRepository: StorageRepository
): Promise<T> {
  const auth = await storageRepository.get<string>('auth');

  const fetchOptions: RequestInit = {
    ...options,
    method: 'GET',
    headers: {
      ...(options.headers || {}),
      ...(!!auth
        ? {
            accessToken: auth,
          }
        : {}),
    },
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

async function post<T>(
  url: string,
  data: unknown,
  options: RequestInit = {},
  storageRepository: StorageRepository
): Promise<T> {
  const auth = await storageRepository.get<string>('auth');

  const fetchOptions: RequestInit = {
    ...options,
    method: 'POST',
    headers: {
      ...(options.headers || {}),
      ...(!!auth
        ? {
            accessToken: auth,
          }
        : {}),
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
