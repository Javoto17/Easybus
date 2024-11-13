import { ClientRepository } from '@/modules/client/domain/ClientRepository';

import { Stop } from '../domain/Stop';
import { StopRepository } from '../domain/StopRepository';
import { StopArrival } from '../domain/StopArrival';
import { StorageRepository } from '@/modules/storage/domain/StorageRepository';

interface GetStopDetailResponse {
  code: string;
  data: {
    stops: Stop[];
  }[];
}

interface GetTimeArrivalsByStopResponse {
  code: string;
  data: {
    Arrive: StopArrival[];
  }[];
}

export function generateStopRepository(
  clientRepository: ClientRepository,
  storageRepository: StorageRepository
): StopRepository {
  return {
    getStopsFavorites: async () => {
      try {
        const stops = (await storageRepository.get<Stop[]>('stops')) ?? [];

        return stops;
      } catch (error) {
        return [];
      }
    },
    getStopIsFavorite: async (stopId: string): Promise<boolean> => {
      try {
        const stops = (await storageRepository.get<Stop[]>('stops')) ?? [];

        return stops.some((stop) => stop?.stop === stopId);
      } catch (error) {
        return false;
      }
    },
    removeStopFavorite: async (stopId: string): Promise<boolean> => {
      try {
        const stops = (await storageRepository.get<Stop[]>('stops')) ?? [];

        let updatedStops = stops.filter(
          (savedStop) => savedStop?.stop !== stopId
        );

        storageRepository.set('stops', updatedStops);

        return true;
      } catch (error) {
        return false;
      }
    },
    saveStopFavorite: async (stop: Stop): Promise<boolean> => {
      try {
        const stops = (await storageRepository.get<Stop[]>('stops')) ?? [];

        stops.push(stop);

        storageRepository.set('stops', stops?.reverse());

        return true;
      } catch (error) {
        return false;
      }
    },
    getStopDetail: async (stopId: string) => {
      try {
        const res = await clientRepository.get<GetStopDetailResponse>(
          process.env.EXPO_PUBLIC_EMT_API_URL +
            `/transport/busemtmad/stops/${stopId}/detail/`
        );

        const data = res?.data?.[0]?.stops?.[0];

        return data;
      } catch (error) {
        console.log(`Error fetching stop ${stopId} data`);
        return null;
      }
    },
    getTimeArrivalsByStop: async (stopId: string) => {
      try {
        const res = await clientRepository.post<GetTimeArrivalsByStopResponse>(
          process.env.EXPO_PUBLIC_EMT_API_URL +
            `/transport/busemtmad/stops/${stopId}/arrives/`,
          {
            cultureInfo: 'ES',
            Text_StopRequired_YN: 'Y',
            Text_EstimationsRequired_YN: 'Y',
            Text_IncidencesRequired_YN: 'Y',
            DateTime_Referenced_Incidencies_YYYYMMDD: 'year-month-day',
          }
        );

        const data = res?.data?.[0]?.Arrive;

        return data;
      } catch (error) {
        console.log(`Error fetching stop ${stopId} data`, error);
        return null;
      }
    },
  };
}
