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
  set(errorAtom, null); // 기존 오류 초기화

  try {
    const res = await axios.get<ProfileData>(API_BASE_URL);
    set(profileAtom, res.data);
  } catch (error) {
    let errorMessage = '프로필을 불러오는 중 오류가 발생했습니다.'; // 기본 오류 메시지

    if (axios.isAxiosError(error)) {
      // Axios 오류인 경우, 서버에서 제공한 메시지를 우선 사용
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      // 일반적인 JS 오류인 경우
      errorMessage = error.message;
    }

    set(errorAtom, errorMessage);
  } finally {
    set(loadingAtom, false);
  }
});

export const saveProfileAtom = atom(null, async (get, set) => {
  set(loadingAtom, true);
  set(errorAtom, null); // 기존 오류 초기화

  try {
    await axios.put(API_BASE_URL, get(profileAtom));
    set(isEditingAtom, false);
    alert('프로필이 저장되었습니다!');
  } catch (error) {
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
