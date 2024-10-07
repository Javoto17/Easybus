import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { cssInterop } from 'nativewind';

import BackButton from '@/components/molecules/BackButton/BackButton';
import { login } from '@/modules/auth/application/login/logIn';
import { AuthRepository } from '@/modules/auth/domain/AuthRepository';
import { useMutation } from '@tanstack/react-query';

interface AuthFlowProps {
  authRepository: AuthRepository;
}

const StackContainer = cssInterop(
  ({ headerStyle, ...props }: any) => (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="stop/[id]"
        options={{
          headerStyle,
          headerLeft: ({ canGoBack }) => {
            return canGoBack ? <BackButton /> : null;
          },
        }}
      />
    </Stack>
  ),
  {
    headerClassName: 'headerStyle',
    backClassName: '',
  }
);

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
      <StackContainer headerClassName="bg-primary text-primary" />
      <StatusBar style="light" />
    </>
  );
}
