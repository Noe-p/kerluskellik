import { Photo } from '@/types';

export enum FILTERS {
  JARDIN = 'JARDIN',
  RDC = 'RDC',
  ETAGE1 = 'ETAGE1',
  ETAGE2 = 'ETAGE2',
  CHAMBRE1 = 'CHAMBRE1',
  CHAMBRE2 = 'CHAMBRE2',
  CHAMBRE3 = 'CHAMBRE3',
  CHAMBRE4 = 'CHAMBRE4',
}

export const JARDIN: Photo[] = [
  {
    filters: [FILTERS.JARDIN],
    src: '/images/jardin/jardin-1.webP',
  },
  {
    filters: [FILTERS.JARDIN],
    src: '/images/jardin/jardin-2.webP',
  },
  {
    filters: [FILTERS.JARDIN],
    src: '/images/jardin/jardin-3.webP',
  },
  {
    filters: [FILTERS.JARDIN],
    src: '/images/jardin/jardin-4.webP',
  },
  {
    filters: [FILTERS.JARDIN],
    src: '/images/jardin/jardin-5.webP',
  },
];

const RDC: Photo[] = [
  {
    filters: [FILTERS.RDC],
    src: '/images/rdc/rdc-1.webP',
  },
  {
    filters: [FILTERS.RDC],
    src: '/images/rdc/rdc-2.webP',
  },
  {
    filters: [FILTERS.RDC],
    src: '/images/rdc/rdc-3.webP',
  },
  {
    filters: [FILTERS.RDC],
    src: '/images/rdc/rdc-4.webP',
  },
  {
    filters: [FILTERS.RDC],
    src: '/images/rdc/rdc-5.webP',
  },
  {
    filters: [FILTERS.RDC],
    src: '/images/rdc/rdc-6.webP',
  },
  {
    filters: [FILTERS.RDC],
    src: '/images/rdc/rdc-7.webP',
  },
  {
    filters: [FILTERS.RDC],
    src: '/images/rdc/rdc-8.webP',
  },
];

const ETAGE1: Photo[] = [
  {
    filters: [FILTERS.ETAGE1],
    src: '/images/etage1/etage1-1.webP',
  },
  {
    filters: [FILTERS.ETAGE1],
    src: '/images/etage1/etage1-2.webP',
  },
  {
    filters: [FILTERS.ETAGE1],
    src: '/images/etage1/sdb1-1.webP',
  },
];

const ETAGE2: Photo[] = [
  {
    filters: [FILTERS.ETAGE2],
    src: '/images/etage2/sdb.webP',
  },
];

const CHAMBRE1: Photo[] = [
  {
    filters: [FILTERS.CHAMBRE1],
    src: '/images/chambre1/chambre1-1.webP',
  },
  {
    filters: [FILTERS.CHAMBRE1],
    src: '/images/chambre1/chambre1-2.webP',
  },
  {
    filters: [FILTERS.CHAMBRE1],
    src: '/images/chambre1/chambre1-3.webP',
  },
  {
    filters: [FILTERS.CHAMBRE1],
    src: '/images/chambre1/chambre1-4.webP',
  },
  {
    filters: [FILTERS.CHAMBRE1],
    src: '/images/chambre1/chambre1-5.webP',
  },
];

const CHAMBRE2: Photo[] = [
  {
    filters: [FILTERS.CHAMBRE2],
    src: '/images/chambre2/chambre2-1.webP',
  },
  {
    filters: [FILTERS.CHAMBRE2],
    src: '/images/chambre2/chambre2-2.webP',
  },
];

const CHAMBRE3: Photo[] = [
  {
    filters: [FILTERS.CHAMBRE3],
    src: '/images/chambre3/chambre3-1.webP',
  },
  {
    filters: [FILTERS.CHAMBRE3],
    src: '/images/chambre3/chambre3-2.webP',
  },
];

const CHAMBRE4: Photo[] = [
  {
    filters: [FILTERS.CHAMBRE4],
    src: '/images/chambre4/chambre4-1.webP',
  },
  {
    filters: [FILTERS.CHAMBRE4],
    src: '/images/chambre4/chambre4-2.JPG',
  },
  {
    filters: [FILTERS.CHAMBRE4],
    src: '/images/chambre4/chambre4-3.JPG',
  },
  {
    filters: [FILTERS.CHAMBRE4],
    src: '/images/chambre4/chambre4-4.webP',
  },
];

export const PHOTOS: Photo[] = [
  ...JARDIN,
  ...RDC,
  ...ETAGE1,
  ...ETAGE2,
  ...CHAMBRE1,
  ...CHAMBRE2,
  ...CHAMBRE3,
  ...CHAMBRE4,
];
