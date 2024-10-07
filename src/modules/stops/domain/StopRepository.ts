import { Stop } from './Stop';
import { StopArrival } from './StopArrival';

export interface StopRepository {
  getStopDetail: (stopId: string) => Promise<Stop | null>;
  getStops: () => Promise<Stop[]>;
  getStopsByRoute: (routeId: string) => Promise<Stop[]>;
  getTimeArrivalsByStop: (stopId: string) => Promise<StopArrival | null>;
}
