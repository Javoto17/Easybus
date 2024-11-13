import { StopRepository } from '../../domain/StopRepository';

export const getStopsFavorites =
  (stopRepository: StopRepository) => async () => {
    return stopRepository.getStopsFavorites();
  };
