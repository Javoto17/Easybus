import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { Text, View } from '@/tw';

import AvatarLine from '@/components/atoms/AvatarLine/AvatarLine';
import { formatDistance } from '@/shared/utils/Distance';
import { formatBustStopTime } from '@/shared/utils/Timer';

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
        <AvatarLine size="big">{line}</AvatarLine>
      </View>
      <View className="flex flex-1 flex-col justify-start">
        <Text className="text-h600 text-primary">{destination}</Text>
        <Text className="text-body-small text-secondary">
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

export const StopLineRowSkeleton = () => {
  return (
    <ContentLoader
      animate
      speed={2}
      width={375}
      height={45}
      viewBox="0 0 375 45"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <Rect x="56" y="8" rx="3" ry="3" width="88" height="6" />
      <Rect x="56" y="26" rx="3" ry="3" width="52" height="6" />
      <Rect x="285" y="26" rx="3" ry="3" width="25" height="6" />
      <Circle cx="20" cy="20" r="20" x="4" />
    </ContentLoader>
  );
};

export default StopLineRow;
