import { ClientRepository } from '@/modules/client/domain/ClientRepository';

import { Stop } from '../domain/Stop';
import { StopRepository } from '../domain/StopRepository';
import { StopArrival } from '../domain/StopArrival';

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
  clientRepository: ClientRepository
): StopRepository {
  return {
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
