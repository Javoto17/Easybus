import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import Header from '@/components/organisms/Header/Header';
import { login } from '@/modules/auth/application/login/logIn';
import { AuthRepository } from '@/modules/auth/domain/AuthRepository';
import { useMutation } from '@tanstack/react-query';

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
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1C1C1C' },
          headerTintColor: '#FFFFFF',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="stop/[id]"
          options={{
            header: (props) => <Header {...props} />,
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
