import { View, Text } from 'react-native';
import React from 'react';

import AvatarLine from '@/components/atoms/AvatarLine/AvatarLine';
import { formatBustStopTime } from '@/shared/utils/Timer';
import { formatDistance } from '@/shared/utils/Distance';

interface StopLineRowProps {
  line: string;
  time: number;
  destination: string;
  distance: number;
}

const StopLineRow: React.FC<StopLineRowProps> = ({
  line,
  destination,
  time,
  distance,
}) => {
  return (
    <View className="flex flex-row gap-x-4 px-1 py-2">
      <View className="basis-auto">
        <AvatarLine>{line}</AvatarLine>
      </View>
      <View className="flex flex-1 flex-col justify-start">
        <Text className="text-primary text-h600">{destination}</Text>
        <Text className="text-secondary text-body-small">
          {formatDistance(distance)}
        </Text>
      </View>
      <View className="basis-auto items-start justify-center">
        <Text className="text-body-base font-semibold text-active">
          {formatBustStopTime(time)}
        </Text>
      </View>
    </View>
  );
};

export default StopLineRow;
