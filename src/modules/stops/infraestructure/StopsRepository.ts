import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { StorageRepository } from '@/modules/storage/domain/StorageRepository';

import { Stop } from '../domain/Stop';
import { StopRepository } from '../domain/StopRepository';

export function generateStopRepository(
  clientRepository: ClientRepository,
  storageRepository: StorageRepository
): StopRepository {
  return {
    getStopDetail: async (stopId: string) => {
      try {
        const data = await clientRepository.get<Stop>(
          `transport/busemtmad/stops/${stopId}/detail/`
        );

        return data;
      } catch (error) {
        console.log(`Error fetching stop ${stopId} data`);
        return null;
      }
    },
  };
}
