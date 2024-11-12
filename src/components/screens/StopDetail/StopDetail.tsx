import React, { Suspense, useMemo } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

import AvatarLine from '@/components/atoms/AvatarLine/AvatarLine';
import { ContentStop } from '@/components/molecules/ContentStop/ContentStop/ContentStop';
import IconButton from '@/components/molecules/IconButton/IconButton';
import ParallaxScrollView from '@/components/molecules/ParallaxScrollView/ParallaxScrollView';
import StopLineRow, {
  StopLineRowSkeleton,
} from '@/components/molecules/StopLineRow/StopLineRow';
import Layout from '@/components/organisms/Layout/Layout';
import { Stop } from '@/modules/stops/domain/Stop';

import { tv } from '@/styles/tv';

interface StopDetailProps {
  stop: Stop;
  isLoading?: boolean;
  isReady?: boolean;
  isError?: boolean;
}

interface StopDetailHeaderRightProps {
  onPressRefresh: () => void;
  onPressFavorite: () => void;
  isFavorite?: boolean;
}

const favoriteButton = tv({
  base: 'text-primary',
  variants: {
    active: {
      true: 'text-yellow-400',
    },
  },
});
export const StopDetailHeaderRight: React.FC<StopDetailHeaderRightProps> = ({
  onPressRefresh,
  onPressFavorite,
  isFavorite = false,
}) => {
  return (
    <View className="flex flex-row items-center gap-x-4">
      <View>
        <IconButton
          variant="primary"
          name="star"
          size={20}
          className={favoriteButton({
            active: isFavorite,
          })}
          onPress={onPressFavorite}
        />
      </View>
      <View>
        <IconButton
          variant="primary"
          name="sync"
          size={20}
          className="text-primary"
          onPress={onPressRefresh}
        />
      </View>
    </View>
  );
};

const StopDetail: React.FC<StopDetailProps> = ({ stop }) => {
  const [region, latLng]: [Region | null, LatLng | null] = useMemo(() => {
    if (!stop?.geometry) {
      return [null, null];
    }

    const latLng = {
      latitude: stop?.geometry?.coordinates?.[1] as number,
      longitude: stop?.geometry?.coordinates?.[0] as number,
    };

    const regionByPlatform: {
      latitudeDelta: number;
      longitudeDelta: number;
    } = Platform.select({
      ios: {
        latitudeDelta: 0.001,
        longitudeDelta: 0.005,
      },
      android: {
        latitudeDelta: 0.001,
        longitudeDelta: 0.005,
      },
    }) ?? {
      latitudeDelta: 0.001,
      longitudeDelta: 0.005,
    };

    return [
      {
        ...latLng,
        ...(regionByPlatform ?? {}),
      },
      latLng,
    ];
  }, [stop?.geometry]);

  const lines = useMemo(() => {
    if (!stop?.dataLine) {
      return;
    }

    return stop?.dataLine.map((dataLine) => {
      return dataLine?.line;
    });
  }, [stop]);

  return (
    <Layout withHeader>
      <ParallaxScrollView
        headerContent={
          <View className="flex-1">
            {region && (
              <MapView
                style={StyleSheet.absoluteFillObject}
                region={region}
                initialRegion={region}
                provider={Platform.select({
                  ios: PROVIDER_DEFAULT,
                  android: PROVIDER_GOOGLE,
                })}
                zoomEnabled={false}
                zoomTapEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
              >
                {latLng && <Marker coordinate={latLng} />}
              </MapView>
            )}
          </View>
        }
      >
        {(stop?.arrives || stop?.dataLine) && (
          <View className="flex flex-col gap-y-margin px-margin">
            <ContentStop.Card>
              <ContentStop.Content className="flex gap-y-2">
                <Text className="text-body-large font-bold text-primary">
                  {stop?.name}
                </Text>
                <Text className="text-body-small font-semibold text-secondary">
                  {stop?.postalAddress}
                </Text>
                <View className="flex flex-row items-center gap-x-2">
                  <Text className="text-body-small font-semibold text-secondary">
                    Lineas:
                  </Text>
                  {lines &&
                    lines?.length > 0 &&
                    lines?.map((line) => {
                      return (
                        <AvatarLine size="small" key={line}>
                          {line}
                        </AvatarLine>
                      );
                    })}
                </View>
              </ContentStop.Content>
            </ContentStop.Card>
            <ContentStop.Card>
              <ContentStop.Title>Tiempos</ContentStop.Title>
              <ContentStop.Content>
                {stop?.arrives &&
                  stop?.arrives?.length > 0 &&
                  stop?.arrives?.map((arrive) => {
                    return (
                      <StopLineRow
                        key={`arrive-${arrive?.line}-${arrive?.estimateArrive}`}
                        line={arrive?.line}
                        destination={arrive?.destination}
                        time={arrive?.estimateArrive}
                        distance={arrive?.DistanceBus}
                      />
                    );
                  })}
              </ContentStop.Content>
            </ContentStop.Card>
          </View>
        )}
      </ParallaxScrollView>
    </Layout>
  );
};

export default StopDetail;
