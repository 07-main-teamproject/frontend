import { atom } from 'jotai';

export const authAtom = atom<{ isAuthenticated: boolean; user: string | null }>(
  {
    isAuthenticated: false, // 로그인 여부
    user: null,
  },
);
