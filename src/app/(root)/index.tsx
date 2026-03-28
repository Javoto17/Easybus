import Home from '@/components/screens/HomeScreen/HomeScreen';

import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { generateStopRepository } from '@/modules/stops/infrastructure/StopsRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const stopRepository = generateStopRepository(
  clientRepository,
  storageRepository
);

export default function HomeScreen() {
  return <Home stopRepository={stopRepository} />;
}
