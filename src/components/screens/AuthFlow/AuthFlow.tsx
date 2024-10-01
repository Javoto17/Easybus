import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';

import { useMutation } from '@tanstack/react-query';
import { AuthRepository } from '@/modules/auth/domain/AuthRepository';

interface AuthFlowProps {
  authRepository: AuthRepository;
}

export default function AuthFlow({ authRepository }: AuthFlowProps) {
  const { isSuccess, isError, mutate, isIdle } = useMutation({
    mutationFn: async (newTodo) => {
      return authRepository.login();
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      mutate();
    };

    SplashScreen.preventAutoHideAsync();
    checkAuth();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      SplashScreen.hideAsync();
    }
  }, [isSuccess]);

  console.log('isIdle', isIdle);
  console.log('isSuccess', isSuccess);

  if (isIdle || !isSuccess) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
