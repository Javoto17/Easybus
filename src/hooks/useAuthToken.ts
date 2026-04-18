import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { fetchAuthToken } from '@/modules/auth/application/fetchAuthToken/fetchAuthToken';
import { generateAuthRepository } from '@/modules/auth/infrastructure/AuthRepository';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';
import { useAuthStore } from '@/stores/authStore';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const authRepository = generateAuthRepository(clientRepository, storageRepository);

export function useAuthToken() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const query = useQuery({
    queryKey: ['auth-token'],
    queryFn: () => fetchAuthToken(authRepository),
    staleTime: Infinity,
    retry: 3,
  });

  useEffect(() => {
    if (query.data) {
      setAuth(query.data.token, query.data.expiresAt);
    }
  }, [query.data, setAuth]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        query.refetch();
      }
    });
    return () => subscription.remove();
  }, [query.refetch]);

  return query;
}
