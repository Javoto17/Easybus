import React, { useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

import { ContentStop } from '@/components/molecules/ContentStop/ContentStop/ContentStop';
import ParallaxScrollView from '@/components/molecules/ParallaxScrollView/ParallaxScrollView';
import StopLineRow from '@/components/molecules/StopLineRow/StopLineRow';
import Layout from '@/components/organisms/Layout/Layout';

import { getStopDetail } from '@/modules/stops/application/getStopDetail/getStopDetail';
import { StopRepository } from '@/modules/stops/domain/StopRepository';

import { useQuery } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';

interface StopDetailProps {
  stopRepository: StopRepository;
  id?: string;
}

const StopDetail: React.FC<StopDetailProps> = ({ stopRepository, id }) => {
  const { isSuccess, isPending, data, isError } = useQuery({
    queryKey: [id],
    queryFn: () => {
      return getStopDetail(stopRepository)(id as string);
    },
    enabled: !!id,
  });

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-primary text-h400">{data?.name}</Text>
      ),
    });
  }, [navigation, data]);

  const [region, latLng]: [Region | null, LatLng | null] = useMemo(() => {
    if (!data?.geometry) {
      return [null, null];
    }

    const latLng = {
      latitude: data?.geometry?.coordinates?.[1] as number,
      longitude: data?.geometry?.coordinates?.[0] as number,
    };

    return [
      {
        ...latLng,
        latitudeDelta: 0,
        longitudeDelta: 0.005,
      },
      latLng,
    ];
  }, [data?.geometry]);

  if (isPending) {
    return (
      <View>
        <Text>Loading... </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <Layout>
      <ParallaxScrollView
        headerContent={
          <View className="flex-1">
            {region && (
              <MapView
                style={{
                  height: '100%',
                  width: '100%',
                }}
                region={region}
                provider={PROVIDER_GOOGLE}
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
        <View className="flex flex-col px-margin">
          <ContentStop.Card>
            <ContentStop.Title>Hola</ContentStop.Title>
            <ContentStop.Content>
              {data?.arrives &&
                data?.arrives?.length > 0 &&
                data?.arrives?.map((arrive) => {
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
      </ParallaxScrollView>
    </Layout>
  );
};

export default StopDetail;
