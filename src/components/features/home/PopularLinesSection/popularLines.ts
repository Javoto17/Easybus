export interface PopularLine {
  id: string;
  number: string;
  name: string;
  color: string;
}

export const POPULAR_LINES: PopularLine[] = [
  { id: '1', number: '1', name: 'Cibeles - Chamartín', color: '#E2001A' },
  {
    id: '2',
    number: '2',
    name: 'Reina Victoria - Argüelles',
    color: '#0066CC',
  },
  { id: '3', number: '53', name: 'Arturo Soria - Sol', color: '#009933' },
];
