import { Tabs } from 'heroui-native';
import React from 'react';

export type HomeTabValue = 'stops' | 'places' | 'routes';

interface HomeTabsProps {
  value: HomeTabValue;
  onValueChange: (value: HomeTabValue) => void;
}

const HomeTabs: React.FC<HomeTabsProps> = ({ value, onValueChange }) => {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as HomeTabValue)}
    >
      <Tabs.List className="bg-surface-secondary mx-margin rounded-2xl p-1">
        <Tabs.Indicator className="bg-accent rounded-xl" />
        <Tabs.Trigger value="stops" className="flex-1 rounded-xl py-2.5">
          <Tabs.Label className="font-poppins text-body-base data-[selected]:text-accent-foreground">
            Paradas
          </Tabs.Label>
        </Tabs.Trigger>
        <Tabs.Trigger value="places" className="flex-1 rounded-xl py-2.5">
          <Tabs.Label className="font-poppins text-body-base data-[selected]:text-accent-foreground">
            Lugares
          </Tabs.Label>
        </Tabs.Trigger>
        <Tabs.Trigger value="routes" className="flex-1 rounded-xl py-2.5">
          <Tabs.Label className="font-poppins text-body-base data-[selected]:text-accent-foreground">
            Rutas
          </Tabs.Label>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
};

export default HomeTabs;
