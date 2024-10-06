import { useRouter } from 'expo-router';
import React from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputSubmitEditingEventData,
} from 'react-native';

import TextField from '@/components/atoms/TextField/TextField';
import Layout from '@/components/organisms/Layout/Layout';

const HomeScreen = () => {
  const router = useRouter();

  const onSubmit = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    console.log(event.nativeEvent.text);

    router.push(`stop/${event.nativeEvent.text}`);
  };

  return (
    <Layout className="px-margin">
      <Text className="text-h100 text-primary-text font-poppins font-bold">
        Easy Bus
      </Text>
      <TextField
        type="search"
        label="label"
        placeholder="Introduce código de parada"
        keyboardType="number-pad"
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
    </Layout>
  );
};

export default HomeScreen;
