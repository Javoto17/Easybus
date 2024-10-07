import { StopRepository } from '../../domain/StopRepository';

export const getStopDetail =
  (stopRepository: StopRepository) => async (stopId: string) => {
    const detail = await stopRepository.getStopDetail(stopId);

    if (!detail?.stop) {
      return null;
    }

    const arrives = await stopRepository.getTimeArrivalsByStop(stopId);

    return {
      ...detail,
      arrives: arrives,
    };
  };
