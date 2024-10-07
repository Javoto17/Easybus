export function formatBustStopTime(seconds: number) {
  if (seconds < 30) {
    return 'Incoming';
  }

  const minutes = Math.floor(seconds / 60);

  return `${minutes} min`;
}
