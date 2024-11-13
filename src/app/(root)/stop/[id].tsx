import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { Suspense, useCallback, useEffect, useState } from 'react';

import ErrorScreen from '@/components/screens/ErrorScreen';
import StopDetail, {
  StopDetailHeaderRight,
} from '@/components/screens/StopDetail/StopDetail';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getStopDetail } from '@/modules/stops/application/detail/getStopDetail';
import { deleteFavorite } from '@/modules/stops/application/favorites/deleteFavorite';
import { getStopIsFavorite } from '@/modules/stops/application/favorites/getStopIsFavorite';
import { saveFavorite } from '@/modules/stops/application/favorites/saveFavorite';
import { Stop } from '@/modules/stops/domain/Stop';
import { generateStopRepository } from '@/modules/stops/infrastructure/StopsRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import StopModal from '@/components/organisms/StopModal/StopModal';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const stopRepository = generateStopRepository(
  clientRepository,
  storageRepository
);

const StopDetailScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const local = useLocalSearchParams<{ id: string }>();

  const queryClient = useQueryClient();

  const navigation = useNavigation();

  const {
    isSuccess: isSuccessStop,
    data,
    isError: isErrorStop,
    isLoading: isLoadingStop,
  } = useQuery({
    queryKey: [`${local?.id}`],
    queryFn: () => {
      return getStopDetail(
        stopRepository,
        storageRepository
      )(local?.id as string);
    },
    enabled: !!local?.id,
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: () => {
      return deleteFavorite(stopRepository)(data?.stop as string);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${local?.id}-favorite`],
      });
      queryClient.invalidateQueries({
        queryKey: [`stops`],
      });
    },
  });

  const saveFavoriteMutation = useMutation({
    mutationFn: (name: string) => {
      let stop = data as Stop;

      if (name) {
        stop.customName = name;
      }

      return saveFavorite(stopRepository)(stop);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${local?.id}-favorite`],
      });
      queryClient.invalidateQueries({
        queryKey: [`stops`],
      });
    },
  });

  const { data: isFavorite } = useQuery({
    queryKey: [`${local?.id}-favorite`],
    queryFn: () => {
      return getStopIsFavorite(stopRepository)(local?.id as string);
    },
    enabled: !!local?.id,
  });

  const onPressRefresh = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [`${local?.id}-favorite`],
    });
    queryClient.invalidateQueries({
      queryKey: [`${local?.id}`],
    });
  }, []);

  const handlePressConfirm = (value: string | undefined) => {
    saveFavoriteMutation.mutate(value);
    setModalVisible(false);
  };

  const handlePressCancel = () => {
    setModalVisible(false);
  };

  const onPressFavorite = () => {
    // toggleFavorite.mutate(isFavorite as boolean);
    if (isFavorite) {
      deleteFavoriteMutation.mutate();

      return;
    }

    setModalVisible(true);
  };

  useEffect(() => {
    if (isSuccessStop) {
      navigation.setOptions({
        title: data?.name,
        headerRight: (props) => (
          <StopDetailHeaderRight
            {...props}
            isFavorite={isFavorite}
            onPressRefresh={onPressRefresh}
            onPressFavorite={onPressFavorite}
          />
        ),
      });
    }
  }, [navigation, data, isFavorite]);

  if (isErrorStop) {
    return <ErrorScreen />;
  }

  return (
    <>
      <StopDetail
        stop={data as Stop}
        isError={isErrorStop}
        isLoading={isLoadingStop}
        isReady={isSuccessStop}
      />

      <StopModal
        visible={modalVisible}
        onPressConfirm={handlePressConfirm}
        onPressCancel={handlePressCancel}
      />
    </>
  );
};

export default StopDetailScreen;
