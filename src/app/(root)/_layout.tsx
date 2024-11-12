import AuthFlow from '@/components/screens/AuthFlow/AuthFlow';
import { generateAuthRepository } from '@/modules/auth/infrastructure/AuthRepository';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { generateStorageRepository } from '@/modules/storage/infraestructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const authRepository = generateAuthRepository(
  clientRepository,
  storageRepository
);

export default function AppLayout() {
  return <AuthFlow authRepository={authRepository} />;
}
