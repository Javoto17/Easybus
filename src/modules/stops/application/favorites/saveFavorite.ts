import { Stop } from '@/modules/stops/domain/Stop';
import { StopRepository } from '../../domain/StopRepository';

export const saveFavorite =
  (stopRepository: StopRepository) => async (stop: Stop) => {
    if (!stop?.stop) {
      return;
    }

    return stopRepository.saveStopFavorite(stop);
  };
