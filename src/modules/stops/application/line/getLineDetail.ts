import { LineDetail } from '@/modules/stops/domain/LineDetail';
import { StopRepository } from '@/modules/stops/domain/StopRepository';

const formatDateRef = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

export const getLineDetail =
  (stopRepository: StopRepository) =>
  async (lineId: string): Promise<LineDetail | null> => {
    if (!lineId) {
      return null;
    }

    const dateRef = formatDateRef(new Date());

    return stopRepository.getLineDetail(lineId, dateRef);
  };
