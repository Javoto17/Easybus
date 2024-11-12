export interface StopArrival {
  line: string;
  stop: string;
  isHead: string;
  destination: string;
  deviation: number;
  bus: number;
  geometry: Geometry;
  estimateArrive: number;
  DistanceBus: number;
  positionTypeBus: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}
