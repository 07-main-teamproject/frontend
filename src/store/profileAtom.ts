import { atom } from 'jotai';
import axios from 'axios';

interface ProfileData {
  profileImage: string;
  nickname: string;
  gender: '남성' | '여성';
  age: number;
  height: number;
  weight: number;
  target_weight: number;
  allergies: string[];
  foodPreferences: string[];
}

const API_BASE_URL = '/api/user/profile/';

export const profileAtom = atom<ProfileData>({
  profileImage: '',
  nickname: '',
  gender: '남성',
  age: 0,
  height: 0,
  weight: 0,
  target_weight: 0,
  allergies: [],
  foodPreferences: [],
});

export const loadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>(null);
export const isEditingAtom = atom<boolean>(false);

export const fetchProfileAtom = atom(null, async (_get, set) => {
  set(loadingAtom, true);
  set(errorAtom, null);

  try {
    const res = await axios.get<ProfileData>(API_BASE_URL);

    set(profileAtom, {
      ...res.data,
      profileImage: res.data.profileImage || '', // 기본값 처리
    });
  } catch (error) {
    console.error('프로필 불러오기 실패:', error);

    let errorMessage = '프로필을 불러오는 중 오류가 발생했습니다.';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    set(errorAtom, errorMessage);
  } finally {
    set(loadingAtom, false);
  }
});

export const saveProfileAtom = atom(null, async (get, set) => {
  set(loadingAtom, true);
  set(errorAtom, null);

  try {
    const { profileImage, ...profileDataWithoutImage } = get(profileAtom);

    await axios.put(API_BASE_URL, profileDataWithoutImage);

    setTimeout(() => {
      set(isEditingAtom, false);
    }, 500); // UI 부드럽게 전환

    console.log('프로필 저장 완료');
  } catch (error) {
    console.error('프로필 저장 실패:', error);

    let errorMessage = '프로필 저장 중 오류가 발생했습니다.';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    set(errorAtom, errorMessage);
  } finally {
    set(loadingAtom, false);
  }
});
