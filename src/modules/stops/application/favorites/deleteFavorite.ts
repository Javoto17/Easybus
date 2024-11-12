import { StopRepository } from '../../domain/StopRepository';

export const deleteFavorite =
  (stopRepository: StopRepository) => async (stopId: string) => {
    if (!stopId) {
      return;
    }

    return stopRepository.removeStopFavorite(stopId);
  };
