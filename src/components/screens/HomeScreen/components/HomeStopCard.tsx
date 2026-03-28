import { Text, View } from '@/tw';
import { Card, Chip, PressableFeedback } from 'heroui-native';
import React from 'react';

import StyledIonicons from '@/components/atoms/StyledIonicons/StyledIonicons';

import { Stop } from '@/modules/stops/domain/Stop';

import { formatBustStopTime } from '@/shared/utils/Timer';

interface HomeStopCardProps {
  stop: Stop;
  onPress: () => void;
  onPressFavorite: () => void;
}

const getArrivalColor = (seconds?: number) => {
  if (seconds === undefined || seconds === null) {
    return 'default' as const;
  }

  if (seconds < 5 * 60) {
    return 'success' as const;
  }

  if (seconds < 10 * 60) {
    return 'warning' as const;
  }

  return 'default' as const;
};

const HomeStopCard: React.FC<HomeStopCardProps> = ({
  stop,
  onPress,
  onPressFavorite,
}) => {
  const lineValues = stop.dataLine?.map((line) => line.line) ?? [];
  const nextArrivalSeconds = stop.arrives?.[0]?.estimateArrive;

  return (
    <PressableFeedback onPress={onPress} className="mx-margin">
      <Card className="border-border bg-surface rounded-2xl border">
        <Card.Header className="flex-row items-center justify-between pb-1">
          <View className="flex-row items-center gap-2">
            <View className="bg-accent/10 rounded-lg p-1.5">
              <StyledIonicons
                name="bus-outline"
                size={15}
                className="text-accent"
              />
            </View>
            <Text className="font-poppins text-body-base text-muted">
              Nº {stop.stop}
            </Text>
          </View>
          <Chip
            color={getArrivalColor(nextArrivalSeconds)}
            variant="soft"
            size="sm"
          >
            <StyledIonicons
              name="time-outline"
              size={12}
              className="text-muted"
            />
            <Chip.Label>
              {nextArrivalSeconds
                ? formatBustStopTime(nextArrivalSeconds)
                : 'Sin tiempo'}
            </Chip.Label>
          </Chip>
        </Card.Header>

        <Card.Body className="pt-1">
          <Card.Title className="font-poppins text-h500 text-foreground">
            {stop.customName ?? stop.name}
          </Card.Title>
          <View className="mt-1 flex-row items-center gap-1">
            <StyledIonicons
              name="location-outline"
              size={14}
              className="text-muted"
            />
            <Card.Description className="font-poppins text-body-small text-muted">
              {stop.postalAddress || `Código ${stop.stop}`}
            </Card.Description>
          </View>
        </Card.Body>

        <Card.Footer className="flex-row items-center justify-between gap-2 pt-1">
          <View className="flex-1 flex-row flex-wrap gap-2">
            {lineValues.length === 0 ? (
              <Chip size="sm" color="default" variant="secondary">
                <Chip.Label>Sin líneas</Chip.Label>
              </Chip>
            ) : (
              lineValues.map((lineValue) => {
                const isNightLine = lineValue.startsWith('N');

                return (
                  <Chip
                    key={`${stop.stop}-${lineValue}`}
                    size="sm"
                    variant={isNightLine ? 'primary' : 'secondary'}
                  >
                    <Chip.Label>{lineValue}</Chip.Label>
                  </Chip>
                );
              })
            )}
          </View>

          <PressableFeedback
            onPress={onPressFavorite}
            className="rounded-full p-1.5"
          >
            <StyledIonicons name="star" size={20} className="text-warning" />
          </PressableFeedback>
        </Card.Footer>
      </Card>
    </PressableFeedback>
  );
};

export default HomeStopCard;
