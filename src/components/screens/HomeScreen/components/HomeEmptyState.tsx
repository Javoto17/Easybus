import { Text, View } from '@/tw';
import { Button } from 'heroui-native';
import React from 'react';

import StyledIonicons from '@/components/atoms/StyledIonicons/StyledIonicons';

interface HomeEmptyStateProps {
  onPressSearch: () => void;
}

const HomeEmptyState: React.FC<HomeEmptyStateProps> = ({ onPressSearch }) => {
  return (
    <View className="flex-1 items-center justify-center px-8 pb-safe-bottom pt-8">
      <View className="bg-surface-secondary mb-4 rounded-3xl p-6">
        <StyledIonicons name="star-outline" size={46} className="text-muted" />
      </View>
      <Text className="font-poppins text-h400 text-foreground text-center font-semibold">
        Sin favoritos
      </Text>
      <Text className="font-poppins text-body-base text-muted mb-6 mt-2 text-center">
        Guarda tus paradas frecuentes para acceder rápidamente.
      </Text>
      <Button variant="primary" onPress={onPressSearch}>
        <StyledIonicons
          name="search-outline"
          size={18}
          className="text-accent-foreground"
        />
        <Button.Label>Buscar paradas</Button.Label>
      </Button>
    </View>
  );
};

export default HomeEmptyState;
