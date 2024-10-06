export type Dataline = {
  headerB: string; // (or headerA) Name of line
  direction: string; // B means from A to B, A means from B to A
  label: string; // Public name
  startTime: string; // Time of start the service line
  stopTime: string; // Time of end the service line
  minFreq: string; // Minimum frequency of line
  maxFreq: string; // Maximum frequency of line
  dayType: string; // Related to current query (LA.- Working day, SA.- Saturday, FE.- Festive)
  line: string; // Line code
};
