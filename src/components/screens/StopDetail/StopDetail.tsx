import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { getStopDetail } from '@/modules/stops/application/getStopDetail/getStopDetail';
import { StopRepository } from '@/modules/stops/domain/StopRepository';
import { useQuery } from '@tanstack/react-query';

interface StopDetailProps {
  stopRepository: StopRepository;
  id?: string;
}

const StopDetail: React.FC<StopDetailProps> = ({ stopRepository, id }) => {
  const { isSuccess, isPending, data, isError } = useQuery({
    queryKey: [id],
    queryFn: () => {
      return getStopDetail(stopRepository)(id as string);
    },
    enabled: !!id,
  });

  if (isPending) {
    return (
      <View>
        <Text>Loading... </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{`Stop detail ${JSON.stringify(data, null, 24)}`}</Text>
    </View>
  );
};

export default StopDetail;
