import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { Text, View } from '@/tw';

import MaterialIcon from '@/components/atoms/MaterialIcon/MaterialIcon';
import TextField from '@/components/atoms/TextField/TextField';
import Layout from '@/components/organisms/Layout/Layout';
import ListOfStops from '@/components/organisms/ListOfStops/ListOfStops';

import { deleteFavorite } from '@/modules/stops/application/favorites/deleteFavorite';
import { StopRepository } from '@/modules/stops/domain/StopRepository';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getStopsFavorites } from '@/modules/stops/application/favorites/getStopsFavorites';

interface HomeProps {
  stopRepository: StopRepository;
}

const HomeScreen = ({ stopRepository }: HomeProps) => {
  const queryClient = useQueryClient();

  const { data: stops } = useQuery({
    queryKey: ['stops'],
    queryFn: () => {
      return getStopsFavorites(stopRepository)();
    },
    enabled: true,
  });

  const removeFavorite = useMutation({
    mutationFn: (stopId: string) => {
      return deleteFavorite(stopRepository)(stopId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stops'],
      });
    },
  });

  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const goToDetail = (stopId: string) => {
    router.push(`stop/${stopId}`);
  };

  const onSubmitEditing = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    goToDetail(event.nativeEvent.text);
    setSearchValue('');
  };

  const handlePressSubmit = () => {
    goToDetail(searchValue);
    setSearchValue('');
  };

  const handleChangeText = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    setSearchValue(event.nativeEvent.text);
  };

  const handlePressFavorite = (stopId: string) => {
    removeFavorite.mutate(stopId);
  };

  return (
    <Layout className="px-margin py-margin">
      <ListOfStops
        data={stops}
        onPressItem={goToDetail}
        header={
          <>
            <View className="flex flex-row items-center gap-x-2">
              <MaterialIcon name="bus" className="text-active" size={42} />
              <Text className="text-h100 font-bold text-primary">Easy Bus</Text>
            </View>
            <View className="mt-4">
              <TextField
                type="search"
                placeholder="Introduce código de parada"
                keyboardType="number-pad"
                onSubmitEditing={onSubmitEditing}
                onChange={handleChangeText}
                onPressSubmit={handlePressSubmit}
                returnKeyType="search"
                value={searchValue}
                blurOnSubmit={false}
              />
            </View>
            <Text className="mt-8 text-h300 font-bold text-primary">
              Listado de favoritos
            </Text>
          </>
        }
        onPressFavorite={handlePressFavorite}
      />
    </Layout>
  );
};

export default HomeScreen;
