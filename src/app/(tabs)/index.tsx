import { Button, Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { generateLoginRepository } from '@/modules/login/infrastructure/LoginRepository';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/modules/login/application/login/logIn';

const LoginRepository = generateLoginRepository(generateClientRepository());

export default function HomeScreen() {
  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      return login(LoginRepository);
    },
    onSuccess: async (data) => {
      console.log('logged', data);
    },
    onError: async (data) => {
      console.log('Error', data);
    },
  });

  const handlePressBtn = () => {
    mutation.mutate();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <Button
        onPress={handlePressBtn}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
