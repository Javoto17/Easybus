import { FlatList, Text, View } from '@/tw';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import Layout from '@/components/organisms/Layout/Layout';
import HomeEmptyState from '@/components/screens/HomeScreen/components/HomeEmptyState';
import HomeHeader from '@/components/screens/HomeScreen/components/HomeHeader';
import HomeLoadingState from '@/components/screens/HomeScreen/components/HomeLoadingState';
import HomeSearchBar from '@/components/screens/HomeScreen/components/HomeSearchBar';
import HomeStopCard from '@/components/screens/HomeScreen/components/HomeStopCard';
import HomeTabs, {
  HomeTabValue,
} from '@/components/screens/HomeScreen/components/HomeTabs';

import { deleteFavorite } from '@/modules/stops/application/favorites/deleteFavorite';
import { getStopsFavorites } from '@/modules/stops/application/favorites/getStopsFavorites';
import { StopRepository } from '@/modules/stops/domain/StopRepository';

interface HomeProps {
  stopRepository: StopRepository;
}

const HomeScreen: React.FC<HomeProps> = ({ stopRepository }) => {
  const queryClient = useQueryClient();
  const getFavoritesQuery = getStopsFavorites(stopRepository);

  const { data: stops = [], isFetching } = useQuery({
    queryKey: ['stops'],
    queryFn: getFavoritesQuery,
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
  const [activeTab, setActiveTab] = useState<HomeTabValue>('stops');

  const router = useRouter();

  const goToDetail = (stopId: string) => {
    router.push({
      pathname: '/(root)/stop/[id]',
      params: { id: stopId },
    });
  };

  const handlePressSubmit = () => {
    if (!searchValue.trim()) {
      return;
    }

    goToDetail(searchValue.trim());
    setSearchValue('');
  };

  const handlePressFavorite = (stopId: string) => {
    removeFavorite.mutate(stopId);
  };

  const renderListContent = () => {
    if (activeTab !== 'stops') {
      return (
        <View className="flex-1 items-center justify-center px-6 py-8">
          <Text className="font-poppins text-body-large text-muted text-center">
            Próximamente disponible en esta pestaña.
          </Text>
        </View>
      );
    }

    if (isFetching) {
      return <HomeLoadingState />;
    }

    if (stops.length === 0) {
      return <HomeEmptyState onPressSearch={() => setActiveTab('stops')} />;
    }

    return (
      <FlatList
        data={stops}
        keyExtractor={(item) => item.stop}
        contentContainerClassName="gap-3 pb-safe-bottom pt-2"
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          return (
            <HomeStopCard
              stop={item}
              onPress={() => goToDetail(item.stop)}
              onPressFavorite={() => handlePressFavorite(item.stop)}
            />
          );
        }}
      />
    );
  };

  return (
    <Layout>
      <View className="bg-background flex-1 gap-3">
        <HomeHeader />
        <HomeSearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSubmit={handlePressSubmit}
        />
        <HomeTabs value={activeTab} onValueChange={setActiveTab} />
        <View className="flex-1">{renderListContent()}</View>
      </View>
    </Layout>
  );
};

export default HomeScreen;
