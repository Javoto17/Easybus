import AuthFlow from '@/components/screens/AuthFlow/AuthFlow';
import { generateAuthRepository } from '@/modules/auth/infrastructure/AuthRepository';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { generateStorageRepository } from '@/modules/storage/infraestructure/StorageRepository';

const clientRepository = generateClientRepository();
const storageRepository = generateStorageRepository();
const authRepository = generateAuthRepository(
  clientRepository,
  storageRepository
);

export default function AppLayout() {
  return <AuthFlow authRepository={authRepository} />;
}
