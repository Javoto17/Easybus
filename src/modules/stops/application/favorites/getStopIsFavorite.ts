import { StopRepository } from '../../domain/StopRepository';

export const getStopIsFavorite =
  (stopRepository: StopRepository) => async (stopId: string) => {
    if (!stopId) {
      return;
    }

    return stopRepository.getStopIsFavorite(stopId);
  };
