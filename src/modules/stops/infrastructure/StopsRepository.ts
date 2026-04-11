import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { StorageRepository } from '@/modules/storage/domain/StorageRepository';

import { LineDetail, LineStop, LineSummary } from '../domain/LineDetail';
import { Stop } from '../domain/Stop';
import { StopArrival } from '../domain/StopArrival';
import { StopRepository } from '../domain/StopRepository';

interface GetStopDetailResponse {
  code: string;
  data: {
    stops: Stop[];
  }[];
}

interface LineSummaryResponseItem {
  line?: string | number;
  Line?: string | number;
  linea?: string | number;
  Linea?: string | number;
  label?: string;
  name?: string;
  lineName?: string;
  descripcion?: string;
}

interface GetTimeArrivalsByStopResponse {
  code: string;
  data: {
    Arrive: StopArrival[];
  }[];
}

interface LineDirectionResponse {
  code: string | number;
  name: string;
  direction?: string;
}

interface LineDetailResponseItem {
  line?: string;
  Line?: string;
  linea?: string;
  Linea?: string;
  label?: string;
  name?: string;
  nameA?: string;
  nameB?: string;
  lineName?: string;
  descripcion?: string;
  minFreq?: string;
  maxFreq?: string;
  startTime?: string;
  stopTime?: string;
  timeTable?: {
    idDayType?: string;
    Direction1?: {
      StartTime?: string;
      StopTime?: string;
      MinimunFrequency?: string;
      MaximumFrequency?: string;
    };
    Direction2?: {
      StartTime?: string;
      StopTime?: string;
      MinimunFrequency?: string;
      MaximumFrequency?: string;
    };
  }[];
  directions?: LineDirectionResponse[];
  dataDirection?: LineDirectionResponse[];
}

interface GetLineDetailResponse {
  code: string;
  data: LineDetailResponseItem[];
}

interface GetLinesResponse {
  code: string;
  data: Record<string, unknown>[];
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const normalizeLineSummary = (item: unknown): LineSummary | null => {
  if (!isRecord(item)) {
    return null;
  }

  const candidate = item as LineSummaryResponseItem;
  const lineValue =
    candidate.line ?? candidate.Line ?? candidate.linea ?? candidate.Linea;

  if (lineValue === undefined || lineValue === null) {
    return null;
  }

  return {
    line: String(lineValue),
    label:
      candidate.label ??
      candidate.name ??
      candidate.lineName ??
      candidate.descripcion ??
      '',
  };
};

const getLineCandidatesFromDataItem = (dataItem: unknown): unknown[] => {
  if (!isRecord(dataItem)) {
    return [];
  }

  const arrayKeys = [
    'lines',
    'Lines',
    'lineas',
    'Lineas',
    'dataLine',
    'dataLines',
  ];

  for (const key of arrayKeys) {
    const value = dataItem[key];

    if (Array.isArray(value)) {
      return value;
    }
  }

  return [dataItem];
};

interface LineStopResponseItem {
  stop: string | number;
  name: string;
  postalAddress?: string;
}

interface GetLineStopsResponse {
  code: string;
  data: {
    stops?: LineStopResponseItem[];
  }[];
}

export function generateStopRepository(
  clientRepository: ClientRepository,
  storageRepository: StorageRepository
): StopRepository {
  return {
    getStops: async () => {
      return [];
    },
    getStopsByRoute: async (routeId: string) => {
      return [];
    },
    getLineDetail: async (lineId: string, dateRef: string) => {
      try {
        const url =
          process.env.EXPO_PUBLIC_EMT_API_URL +
          `/transport/busemtmad/lines/${lineId}/info/${dateRef}/`;
        console.log('[StopsRepository] Fetching from URL:', url);

        const res = await clientRepository.get<GetLineDetailResponse>(url);

        console.log(
          '[StopsRepository] Full response object keys:',
          Object.keys(res || {})
        );
        console.log('[StopsRepository] res.data:', res?.data);
        console.log('[StopsRepository] res.data[0]:', res?.data?.[0]);
        console.log(
          '[StopsRepository] Type of res.data[0]:',
          typeof res?.data?.[0]
        );

        const lineData = res?.data?.[0];

        console.log('[StopsRepository] lineData type:', typeof lineData);
        console.log(
          '[StopsRepository] lineData value:',
          JSON.stringify(lineData)
        );
        console.log(
          '[StopsRepository] lineData keys:',
          lineData && typeof lineData === 'object'
            ? Object.keys(lineData)
            : 'N/A'
        );

        if (!lineData) {
          console.log('[StopsRepository] No lineData found in response');
          return null;
        }

        const lineValue =
          lineData.line ?? lineData.Line ?? lineData.linea ?? lineData.Linea;
        const labelValue =
          lineData.label ??
          lineData.name ??
          lineData.lineName ??
          lineData.descripcion ??
          '';

        console.log('[StopsRepository] lineValue:', lineValue);
        console.log('[StopsRepository] labelValue:', labelValue);

        if (!lineValue) {
          console.log('[StopsRepository] No lineValue found');
          return null;
        }

        // Extraer direcciones de nameA y nameB si existen
        const directions: LineDirectionResponse[] = [];
        if (lineData.nameA) {
          directions.push({ code: '1', name: lineData.nameA });
        }
        if (lineData.nameB) {
          directions.push({ code: '2', name: lineData.nameB });
        }

        // Extraer horarios y frecuencias del timeTable (usar LA - laborable por defecto)
        const timeTable =
          lineData.timeTable?.find((t) => t.idDayType === 'LA') ||
          lineData.timeTable?.[0];
        const direction1Data = timeTable?.Direction1;

        const startTime = direction1Data?.StartTime ?? '';
        const stopTime = direction1Data?.StopTime ?? '';
        const minFreq = direction1Data?.MinimunFrequency ?? '';
        const maxFreq = direction1Data?.MaximumFrequency ?? '';

        return {
          line: String(lineValue),
          label: labelValue,
          minFreq,
          maxFreq,
          startTime,
          stopTime,
          directions,
        } as LineDetail;
      } catch (error) {
        console.log(`Error fetching line ${lineId} detail`, error);
        return null;
      }
    },
    getLines: async (dateRef: string): Promise<LineSummary[]> => {
      try {
        const res = await clientRepository.get<GetLinesResponse>(
          process.env.EXPO_PUBLIC_EMT_API_URL +
            `/transport/busemtmad/lines/info/${dateRef}/`
        );

        const dataItems = Array.isArray(res?.data) ? res.data : [];
        const allCandidates = dataItems.flatMap(getLineCandidatesFromDataItem);

        const lines = allCandidates
          .map(normalizeLineSummary)
          .filter((line): line is LineSummary => !!line)
          .filter((line, index, self) => {
            return (
              self.findIndex((candidate) => candidate.line === line.line) ===
              index
            );
          });

        return lines;
      } catch (error) {
        console.log('Error fetching lines list', error);
        return [];
      }
    },
    getStopsByLineAndDirection: async (lineId: string, direction: string) => {
      try {
        const res = await clientRepository.get<GetLineStopsResponse>(
          process.env.EXPO_PUBLIC_EMT_API_URL +
            `/transport/busemtmad/lines/${lineId}/stops/${direction}/`
        );

        const stops = res?.data?.[0]?.stops ?? [];

        return stops.map((stop) => ({
          stop: String(stop.stop),
          name: stop.name,
          postalAddress: stop.postalAddress ?? '',
        })) as LineStop[];
      } catch (error) {
        console.log(
          `Error fetching stops for line ${lineId} and direction ${direction}`,
          error
        );
        return [];
      }
    },
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
