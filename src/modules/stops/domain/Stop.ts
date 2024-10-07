import { StopArrival } from './StopArrival';
import { Dataline } from './StopDataLine';

export type Stop = {
  pmv: string; // If the stop contains an electronic panel, contains the number (or empty)
  name: string; // Stop name
  geometry: string; // Geographical position
  stop: string; // Stop ID
  dataline: Dataline[];
  arrives?: StopArrival[];
};
