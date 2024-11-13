import React from 'react';
import { FlatList, Text, View } from 'react-native';

import StopItem from '@/components/molecules/StopItem/StopItem';

import { Stop } from '@/modules/stops/domain/Stop';

interface ListOfStops {
  data: Stop[];
  header?: React.ReactElement;
  onPressFavorite: (stopId: string) => void;
  onPressItem: (stopId: string) => void;
}

const ListOfStops = ({
  data,
  header,
  onPressFavorite,
  onPressItem,
}: ListOfStops) => {
  const renderItem = ({ item }: { item: Stop }) => {
    return (
      <StopItem
        name={item?.customName ?? item.name}
        code={item.stop}
        isFavorite={item.isFavorite}
        onPressFavorite={() => onPressFavorite(item.stop)}
        lines={item.dataLine.map((line) => line.line)}
        onPress={() => onPressItem(item.stop)}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyboardShouldPersistTaps="handled"
      renderItem={renderItem}
      contentContainerClassName="flex flex-col gap-y-margin"
      keyExtractor={(item) => item.stop}
      ListHeaderComponent={header}
      ListHeaderComponentClassName="mb-margin"
      ListEmptyComponent={
        <View className="flex flex-col items-center justify-center">
          <Text className="text-center text-h400 text-secondary">
            No hay paradas añadidas
          </Text>
        </View>
      }
    />
  );
};

export default ListOfStops;
