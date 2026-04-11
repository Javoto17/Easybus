export interface LineDirection {
  code: string;
  name: string;
}

export interface LineDetail {
  line: string;
  label: string;
  minFreq: string;
  maxFreq: string;
  startTime: string;
  stopTime: string;
  directions: LineDirection[];
}

export interface LineStop {
  stop: string;
  name: string;
  postalAddress: string;
}

export interface LineSummary {
  line: string;
  label: string;
}
