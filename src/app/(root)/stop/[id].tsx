import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import StopDetail from '@/components/screens/StopDetail/StopDetail';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { generateStopRepository } from '@/modules/stops/infraestructure/StopsRepository';
import { generateStorageRepository } from '@/modules/storage/infraestructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const stopRepository = generateStopRepository(clientRepository);

const StopDetailScreen = () => {
  const local = useLocalSearchParams<{ id: string }>();

  return <StopDetail id={local?.id} stopRepository={stopRepository} />;
};

export default StopDetailScreen;
