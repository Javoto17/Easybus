import { StopRepository } from '../../domain/StopRepository';

export async function getStopDetail(
  stopRepository: StopRepository,
  stopId: string
) {
  return await stopRepository.getStopDetail(stopId);
}
