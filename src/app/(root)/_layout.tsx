import { generateAuthRepository } from '@/modules/auth/infrastructure/AuthRepository';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const authRepository = generateAuthRepository(
  clientRepository,
  storageRepository
);

export default function AppLayout() {
  return null;
}
