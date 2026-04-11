import { t } from '@/i18n';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';

import {
  FavoritesEmptyState,
  FavoritesErrorState,
  FavoritesListSection,
  FavoritesLoadingState,
  LiveStatusSection,
  PopularLinesSection,
  QuickActionsSection,
  SearchResultsSection,
} from '@/components/features/home';
import { ScreenLayout, Typography } from '@/components/shared';

import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getStopsFavorites } from '@/modules/stops/application/favorites/getStopsFavorites';
import {
  HomeSearchStopResult,
  searchHome,
} from '@/modules/stops/application/search/searchHome';
import { LineSummary } from '@/modules/stops/domain/LineDetail';
import { Stop } from '@/modules/stops/domain/Stop';
import { generateStopRepository } from '@/modules/stops/infrastructure/StopsRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const stopRepository = generateStopRepository(
  clientRepository,
  storageRepository
);

// Define all sections as data items
type SectionType =
  | { type: 'searchResults'; query: string }
  | { type: 'quickActions' }
  | { type: 'favoritesLoading' }
  | { type: 'favoritesError'; onRetry: () => void }
  | { type: 'favoritesEmpty' }
  | { type: 'favoritesList'; favorites: Stop[] }
  | { type: 'popularLines' }
  | { type: 'liveStatus' };

interface SearchBarTextChangeEvent {
  nativeEvent?: {
    text?: string;
  };
}

const normalizeNumericId = (value: string): string => {
  return String(Number(value));
};

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState('');
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const router = useRouter();

  const {
    data: favorites = [],
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
  } = useQuery({
    queryKey: ['stops-favorites'],
    queryFn: getStopsFavorites(stopRepository),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: searchResults = { lines: [], stops: [], directStopId: null },
    isFetching: isSearching,
  } = useQuery({
    queryKey: ['home-search', debouncedSearchQuery],
    queryFn: () => searchHome(stopRepository)(debouncedSearchQuery),
    enabled: debouncedSearchQuery.trim().length > 0,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 220);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: t('home.searchPlaceholder'),
        hideWhenScrolling: false,
        hideNavigationBar: false,
        onChangeText: (event: SearchBarTextChangeEvent) => {
          const text = event?.nativeEvent?.text ?? '';

          setSearchQuery(text);
        },
        onSearchButtonPress: (event: SearchBarTextChangeEvent) => {
          const text = (event?.nativeEvent?.text ?? searchQuery).trim();

          setSearchQuery(text);
          setSubmittedSearchQuery(text);
        },
        onCancelButtonPress: () => {
          setSearchQuery('');
          setSubmittedSearchQuery('');
        },
      },
    });
  }, [navigation, searchQuery]);

  useEffect(() => {
    if (!submittedSearchQuery) {
      return;
    }

    if (debouncedSearchQuery !== submittedSearchQuery || isSearching) {
      return;
    }

    const isNumericSubmittedQuery = /^\d+$/.test(submittedSearchQuery);
    const exactLineMatch = searchResults.lines.find((line) => {
      if (!isNumericSubmittedQuery) {
        return line.line === submittedSearchQuery;
      }

      return (
        normalizeNumericId(line.line) ===
        normalizeNumericId(submittedSearchQuery)
      );
    });

    const shouldNavigateDirectlyToLine =
      isNumericSubmittedQuery && !!exactLineMatch;
    const shouldNavigateDirectlyToStop =
      isNumericSubmittedQuery &&
      !exactLineMatch &&
      !!searchResults.directStopId;

    if (shouldNavigateDirectlyToLine && exactLineMatch) {
      router.push(`/line/${exactLineMatch.line}` as never);
      setSearchQuery('');
      setSubmittedSearchQuery('');
      return;
    }

    if (shouldNavigateDirectlyToStop) {
      router.push(`/stop/${searchResults.directStopId}` as never);
      setSearchQuery('');
    }

    setSubmittedSearchQuery('');
  }, [
    debouncedSearchQuery,
    isSearching,
    router,
    searchResults.directStopId,
    searchResults.lines,
    submittedSearchQuery,
  ]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['stops-favorites'] });
    setRefreshing(false);
  }, [queryClient]);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ['stops-favorites'] });
    }, [queryClient])
  );

  const onPressLineResult = useCallback(
    (line: LineSummary) => {
      router.push(`/line/${line.line}` as never);
    },
    [router]
  );

  const onPressStopResult = useCallback(
    (stop: HomeSearchStopResult) => {
      router.push(`/stop/${stop.stop}` as never);
    },
    [router]
  );

  const isSearchVisible = searchQuery.trim().length > 0;

  const sections: SectionType[] = isSearchVisible
    ? [{ type: 'searchResults', query: searchQuery.trim() }]
    : [
        { type: 'quickActions' },
        ...(isLoadingFavorites ? [{ type: 'favoritesLoading' } as const] : []),
        ...(isErrorFavorites
          ? [{ type: 'favoritesError', onRetry: onRefresh } as const]
          : []),
        ...(favorites.length === 0 && !isLoadingFavorites && !isErrorFavorites
          ? [{ type: 'favoritesEmpty' } as const]
          : []),
        ...(favorites.length > 0
          ? [{ type: 'favoritesList', favorites } as const]
          : []),
        { type: 'popularLines' },
        { type: 'liveStatus' },
      ];

  const renderSection = ({ item }: { item: SectionType }) => {
    switch (item.type) {
      case 'searchResults':
        return (
          <SearchResultsSection
            query={item.query}
            isLoading={isSearching}
            lines={searchResults.lines}
            stops={searchResults.stops}
            onPressLine={onPressLineResult}
            onPressStop={onPressStopResult}
          />
        );
      case 'quickActions':
        return <QuickActionsSection />;
      case 'favoritesLoading':
        return <FavoritesLoadingState />;
      case 'favoritesError':
        return <FavoritesErrorState onRetry={item.onRetry} />;
      case 'favoritesEmpty':
        return <FavoritesEmptyState />;
      case 'favoritesList':
        return <FavoritesListSection favorites={item.favorites} />;
      case 'popularLines':
        return <PopularLinesSection />;
      case 'liveStatus':
        return <LiveStatusSection />;
      default:
        return null;
    }
  };

  const keyExtractor = (item: SectionType, index: number) => {
    return `${item.type}-${index}`;
  };

  const RefreshControlComponent = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="primary"
      colors={['primary']}
    />
  );

  const HomeHeader = isSearchVisible ? null : (
    <View className="px-5 pt-6 pb-2">
      <Typography variant="label-sm" tone="muted" className="mb-2">
        {t('home.brand')}
      </Typography>
      <Typography variant="headline-md">{t('tabs.home')}</Typography>
      <Text className="text-sm text-on-surface-variant mt-2">
        {t('home.subtitle')}
      </Text>
    </View>
  );

  return (
    <ScreenLayout
      variant="flatlist"
      data={sections}
      keyExtractor={keyExtractor}
      renderItem={renderSection}
      refreshControl={isSearchVisible ? undefined : RefreshControlComponent}
      ListHeaderComponent={HomeHeader}
      className="bg-surface flex-1"
      edges={['bottom']}
      showsVerticalScrollIndicator={false}
    />
  );
}
