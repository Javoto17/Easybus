export function formatBusStopTime(seconds: number): string {
  if (seconds < 30) {
    return 'Incoming';
  }

  if (seconds > 60 * 60 * 25) {
    return `25+ min`;
  }

  const minutes = Math.floor(seconds / 60);

  return `${minutes} min`;
}
