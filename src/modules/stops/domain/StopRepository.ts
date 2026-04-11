import { LineDetail, LineStop, LineSummary } from './LineDetail';
import { Stop } from './Stop';
import { StopArrival } from './StopArrival';

export interface StopRepository {
  getStopDetail: (stopId: string) => Promise<Stop | null>;
  getLineDetail: (
    lineId: string,
    dateRef: string
  ) => Promise<LineDetail | null>;
  getLines: (dateRef: string) => Promise<LineSummary[]>;
  getStops: () => Promise<Stop[]>;
  getStopsByRoute: (routeId: string) => Promise<Stop[]>;
  getStopsByLineAndDirection: (
    lineId: string,
    direction: string
  ) => Promise<LineStop[]>;
  getTimeArrivalsByStop: (stopId: string) => Promise<StopArrival[] | null>;
  saveStopFavorite: (stop: Stop) => Promise<boolean>;
  removeStopFavorite: (stopId: string) => Promise<boolean>;
  getStopIsFavorite: (stopId: string) => Promise<boolean>;
  getStopsFavorites: () => Promise<Stop[]>;
}
