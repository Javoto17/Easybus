import { LineStop } from '@/modules/stops/domain/LineDetail';
import { StopRepository } from '@/modules/stops/domain/StopRepository';

export const getLineStopsByDirection =
  (stopRepository: StopRepository) =>
  async (lineId: string, direction: string): Promise<LineStop[]> => {
    if (!lineId || !direction) {
      return [];
    }

    return stopRepository.getStopsByLineAndDirection(lineId, direction);
  };
