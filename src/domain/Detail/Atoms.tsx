import { atom } from 'jotai';

export interface Food {
  name: string;
  protein: number;
  minerals: number;
  vitamins: number;
}

export const foodsAtom = atom<Food[]>([
  { name: '현미밥', protein: 10, minerals: 5, vitamins: 7 },
  { name: '닭가슴살 100g', protein: 25, minerals: 8, vitamins: 5 },
  { name: '삶은 계란 2개', protein: 15, minerals: 7, vitamins: 6 },
]);
