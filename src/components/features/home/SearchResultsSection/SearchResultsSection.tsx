import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Ionicons, Typography } from '@/components/shared';

import { useTranslation } from '@/hooks/useTranslation';

import {
  HomeSearchResult,
  HomeSearchStopResult,
} from '@/modules/stops/application/search/searchHome';
import { LineSummary } from '@/modules/stops/domain/LineDetail';

interface SearchResultsSectionProps {
  query: string;
  isLoading: boolean;
  lines: HomeSearchResult['lines'];
  stops: HomeSearchResult['stops'];
  onPressLine: (line: LineSummary) => void;
  onPressStop: (stop: HomeSearchStopResult) => void;
}

interface SearchRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  trailingLabel?: string;
  onPress: () => void;
}

const SearchRow = ({
  icon,
  title,
  subtitle,
  trailingLabel,
  onPress,
}: SearchRowProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 px-5 py-3 active:opacity-80"
    >
      <View className="h-10 w-10 rounded-xl bg-surface-container-high items-center justify-center">
        <Ionicons name={icon} size={18} color="#85adff" />
      </View>
      <View className="flex-1">
        <Typography variant="title-sm">{title}</Typography>
        <Text className="text-xs text-on-surface-variant mt-0.5">
          {subtitle}
        </Text>
      </View>
      {!!trailingLabel && (
        <View className="rounded-full bg-surface-container-high px-2 py-1">
          <Typography variant="label-sm" tone="muted" className="text-[10px]">
            {trailingLabel}
          </Typography>
        </View>
      )}
    </Pressable>
  );
};

const SearchSectionTitle = ({ title }: { title: string }) => (
  <Typography variant="label-sm" tone="muted" className="px-5 pt-5 pb-2">
    {title}
  </Typography>
);

export const SearchResultsSection = ({
  query,
  isLoading,
  lines,
  stops,
  onPressLine,
  onPressStop,
}: SearchResultsSectionProps) => {
  const { t } = useTranslation();
  const hasResults = lines.length > 0 || stops.length > 0;
  const hasQuery = query.trim().length > 0;

  if (!hasQuery) {
    return null;
  }

  if (isLoading) {
    return (
      <View className="pt-safe-or-4 pb-2 px-5">
        <Typography variant="label-sm" tone="muted" className="mb-2">
          {t('search.title')}
        </Typography>
        <Typography variant="headline-md">
          {t('search.searchingFor', { query })}
        </Typography>
        <Text className="text-sm text-on-surface-variant mt-2">
          {t('search.loadingResults')}
        </Text>
      </View>
    );
  }

  if (!hasResults) {
    return (
      <View className="pt-safe-or-4 pb-2 px-5">
        <Typography variant="label-sm" tone="muted" className="mb-2">
          {t('search.title')}
        </Typography>
        <Typography variant="headline-md">{t('search.noResults')}</Typography>
        <Text className="text-sm text-on-surface-variant mt-2">
          {t('search.noResultsDescription')}
        </Text>
      </View>
    );
  }

  return (
    <View className="pt-safe-or-4 pb-4">
      <View className="px-5 pb-1">
        <Typography variant="label-sm" tone="muted" className="mb-2">
          {t('search.title')}
        </Typography>
        <Typography variant="headline-md">
          {t('search.resultsFor', { query })}
        </Typography>
      </View>

      {stops.length > 0 && (
        <View>
          <SearchSectionTitle title={t('line.stops')} />
          {stops.map((stop) => (
            <SearchRow
              key={`stop-${stop.stop}`}
              icon="location-outline"
              title={`${stop.name} · ${stop.stop}`}
              subtitle={stop.postalAddress || t('search.noAddressAvailable')}
              trailingLabel={
                stop.isFavorite ? t('search.favoriteTag') : undefined
              }
              onPress={() => onPressStop(stop)}
            />
          ))}
        </View>
      )}

      {lines.length > 0 && (
        <View>
          <SearchSectionTitle title={t('tabs.lines')} />
          {lines.map((line) => (
            <SearchRow
              key={`line-${line.line}`}
              icon="bus-outline"
              title={`${t('glossary.line')} ${line.line}`}
              subtitle={line.label}
              onPress={() => onPressLine(line)}
            />
          ))}
        </View>
      )}
    </View>
  );
};
