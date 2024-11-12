export function formatDistance(meters: number) {
  if (meters >= 1000) {
    const kms = (meters / 1000).toFixed(2);
    return `${kms} km`;
  }
  return `${meters} m`;
}
