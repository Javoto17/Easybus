import { StorageRepository } from '@/modules/storage/domain/StorageRepository';
import { StopRepository } from '../../domain/StopRepository';
import { Stop } from '../../domain/Stop';

export const getStopDetail =
  (stopRepository: StopRepository, storageRepository: StorageRepository) =>
  async (stopId: string) => {
    const detail = await stopRepository.getStopDetail(stopId);

    if (!detail?.stop) {
      return null;
    }

    const stops = (await storageRepository.get<Stop[]>('stops')) ?? [];

    const isFavorite = stops.some((stop) => stop?.stop === stopId);

    const arrives = await stopRepository.getTimeArrivalsByStop(stopId);

    return {
      ...detail,
      arrives: arrives,
      isFavorite: isFavorite ?? false,
    };
  };
