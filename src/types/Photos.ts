import { FILTERS } from '@/static/photos';

export interface Photo {
  filters: FILTERS[];
  src: string;
}
