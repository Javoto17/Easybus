import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const StopDetail = () => {
  const local = useLocalSearchParams<{ id: string }>();

  console.log(local);

  return (
    <View>
      <Text>{`Stop detail ${local?.id}`}</Text>
    </View>
  );
};

export default StopDetail;
