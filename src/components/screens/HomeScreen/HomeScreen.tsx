import React from 'react';
import { useRouter } from 'expo-router';
import {
  NativeSyntheticEvent,
  Text,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';

import TextField from '@/components/atoms/TextField/TextField';
import Layout from '@/components/organisms/Layout/Layout';

const HomeScreen = () => {
  const router = useRouter();

  const onSubmit = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    router.push(`stop/${event.nativeEvent.text}`);
  };

  return (
    <Layout className="px-margin">
      <Text className="font-poppins text-h100 font-bold text-primary-text">
        Easy Bus
      </Text>
      <View className="mt-4">
        <TextField
          type="search"
          placeholder="Introduce código de parada"
          keyboardType="number-pad"
          onSubmitEditing={onSubmit}
          returnKeyType="search"
        />
      </View>
    </Layout>
  );
};

export default HomeScreen;
