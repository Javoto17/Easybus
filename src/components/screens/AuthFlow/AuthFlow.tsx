import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';

import { useMutation } from '@tanstack/react-query';

import { AuthRepository } from '@/modules/auth/domain/AuthRepository';
import { login } from '@/modules/auth/application/login/logIn';

import { StatusBar } from 'expo-status-bar';

interface AuthFlowProps {
  authRepository: AuthRepository;
}

export default function AuthFlow({ authRepository }: AuthFlowProps) {
  const { isSuccess, isError, mutate, isIdle } = useMutation({
    mutationFn: async (newTodo) => {
      return login(authRepository);
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

  if (isIdle || !isSuccess) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="stop/[id]" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
