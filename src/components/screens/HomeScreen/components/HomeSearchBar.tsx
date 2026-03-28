import { Button, SearchField } from 'heroui-native';
import React from 'react';
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';

import StyledIonicons from '@/components/atoms/StyledIonicons/StyledIonicons';

interface HomeSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const HomeSearchBar: React.FC<HomeSearchBarProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  const onSubmitEditing = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    if (event.nativeEvent.text.trim()) {
      onSubmit();
    }
  };

  return (
    <SearchField value={value} onChange={onChange} className="px-margin">
      <SearchField.Group className="border-border bg-surface-secondary rounded-2xl border">
        <SearchField.SearchIcon />
        <SearchField.Input
          placeholder="Introduce código de parada"
          keyboardType="number-pad"
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
          className="text-foreground"
        />
        <SearchField.ClearButton />
        <Button
          variant="primary"
          size="sm"
          isIconOnly
          className="mr-2 rounded-xl"
          onPress={onSubmit}
          isDisabled={!value.trim()}
          accessibilityLabel="Buscar parada"
        >
          <StyledIonicons
            name="arrow-forward"
            size={16}
            className="text-accent-foreground"
          />
        </Button>
      </SearchField.Group>
    </SearchField>
  );
};

export default HomeSearchBar;
