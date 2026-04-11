import { LineSummary } from '@/modules/stops/domain/LineDetail';
import { Stop } from '@/modules/stops/domain/Stop';
import { StopRepository } from '@/modules/stops/domain/StopRepository';

export interface HomeSearchStopResult {
  stop: string;
  name: string;
  postalAddress: string;
  isFavorite: boolean;
}

export interface HomeSearchResult {
  lines: LineSummary[];
  stops: HomeSearchStopResult[];
  directStopId: string | null;
}

const formatDateRef = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

const mapStopResult = (
  stop: Stop,
  isFavorite: boolean
): HomeSearchStopResult => ({
  stop: stop.stop,
  name: stop.customName || stop.name,
  postalAddress: stop.postalAddress || '',
  isFavorite,
});

const normalizeText = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const normalizeNumericId = (value: string): string => {
  return String(Number(value));
};

export const searchHome =
  (stopRepository: StopRepository) =>
  async (query: string): Promise<HomeSearchResult> => {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      return {
        lines: [],
        stops: [],
        directStopId: null,
      };
    }

    const dateRef = formatDateRef(new Date());
    const [allLines, favoriteStops] = await Promise.all([
      stopRepository.getLines(dateRef),
      stopRepository.getStopsFavorites(),
    ]);

    const linesFromFavorites: LineSummary[] = favoriteStops
      .flatMap((stop) => stop.dataLine || [])
      .map((line) => ({
        line: String(line.line),
        label: line.label || '',
      }));

    const mergedLines = [...allLines, ...linesFromFavorites].filter(
      (line, index, self) => {
        return (
          self.findIndex((candidate) => candidate.line === line.line) === index
        );
      }
    );

    const isNumericQuery = /^\d+$/.test(normalizedQuery);
    const normalizedQueryId = isNumericQuery
      ? normalizeNumericId(normalizedQuery)
      : null;

    const lines = mergedLines
      .filter((line) => {
        const searchableLine = normalizeText(`${line.line} ${line.label}`);

        if (isNumericQuery) {
          const normalizedLineId = normalizeNumericId(line.line);

          return (
            searchableLine.includes(normalizedQuery) ||
            normalizedLineId === normalizedQueryId
          );
        }

        return searchableLine.includes(normalizedQuery);
      })
      .sort((left, right) => {
        const leftExact = normalizeText(left.line) === normalizedQuery ? 1 : 0;
        const rightExact =
          normalizeText(right.line) === normalizedQuery ? 1 : 0;

        return rightExact - leftExact;
      })
      .slice(0, 8);

    const stopsFromFavorites = favoriteStops
      .filter((stop) => {
        const searchableStop =
          `${stop.stop} ${stop.name} ${stop.customName || ''} ${
            stop.postalAddress || ''
          }`
            .toLowerCase()
            .trim();

        return searchableStop.includes(normalizedQuery);
      })
      .slice(0, 8)
      .map((stop) => mapStopResult(stop, true));

    let directStopId: string | null = null;
    const numericQuery = isNumericQuery;

    if (
      numericQuery &&
      normalizedQueryId &&
      !lines.some((line) => normalizeNumericId(line.line) === normalizedQueryId)
    ) {
      const lineDetail = await stopRepository.getLineDetail(
        normalizedQuery,
        dateRef
      );

      if (lineDetail?.line) {
        lines.unshift({
          line: lineDetail.line,
          label: lineDetail.label,
        });
      }
    }

    if (numericQuery) {
      const stopById = await stopRepository.getStopDetail(normalizedQuery);

      if (stopById?.stop) {
        directStopId = String(stopById.stop);

        const alreadyIncluded = stopsFromFavorites.some(
          (stop) => stop.stop === directStopId
        );

        if (!alreadyIncluded) {
          stopsFromFavorites.unshift(mapStopResult(stopById, false));
        }
      }
    }

    return {
      lines,
      stops: stopsFromFavorites,
      directStopId,
    };
  };
