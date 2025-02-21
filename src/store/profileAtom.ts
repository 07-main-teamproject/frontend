import { atom } from 'jotai';
import axios from 'axios';

interface ProfileData {
  name: string;
  profileImage: string;
  nickname: string;
  gender: 'M' | 'F';
  age: number;
  height: number;
  weight: number;
  target_weight: number;
  allergies: string[];
  preferences: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/user/profile/';

export const profileAtom = atom<ProfileData>({
  name: '',
  profileImage: '',
  nickname: '',
  gender: 'M',
  age: 0,
  height: 0,
  weight: 0,
  target_weight: 0,
  allergies: [],
  preferences: [],
});

export const loadingAtom = atom<boolean>(true);

export const errorAtom = atom<string | null>(null);

export const isEditingAtom = atom<boolean>(false);

const handleApiRequest = async (
  callback: () => Promise<void>,
  set: (atom: any, value: any) => void,
) => {
  set(loadingAtom, true);
  set(errorAtom, null);
  try {
    await callback();
  } catch (error) {
    let errorMessage = '오류가 발생했습니다.';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('API Error:', error);
    set(errorAtom, errorMessage);
  } finally {
    set(loadingAtom, false);
  }
};

export const fetchProfileAtom = atom(null, async (_get, set) => {
  await handleApiRequest(async () => {
    const { data } = await axios.get<ProfileData>(API_BASE_URL);

    if (!data || !data.name) {
      throw new Error('서버에서 올바른 프로필 데이터를 반환하지 않았습니다.');
    }

    set(profileAtom, data);
  }, set);
});

export const saveProfileAtom = atom(null, async (get, set) => {
  await handleApiRequest(async () => {
    const { status } = await axios.put(API_BASE_URL, get(profileAtom));

    if (status === 200) {
      set(isEditingAtom, false);
      alert('프로필이 저장되었습니다!');
    } else {
      throw new Error('서버에서 예상치 못한 응답을 반환했습니다.');
    }
  }, set);
});
