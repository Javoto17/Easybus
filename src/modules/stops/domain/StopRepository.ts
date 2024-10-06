import { Stop } from './Stop';

export interface StopRepository {
  getStopDetail: (stopId: string) => Promise<Stop | null>;
  getStops: () => Promise<Stop[]>;
  getStopsByRoute: (routeId: string) => Promise<Stop[]>;
}
