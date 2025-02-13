import { atom } from "jotai";
import axios from "axios";

interface ProfileData {
  profileImage: string;
  nickname: string;
  gender: "남성" | "여성";
  age: number;
  height: number;
  weight: number;
  target_weight: number;
  allergies: string;
  foodPreferences: string;
}

const API_BASE_URL = "/api/user/profile/";

export const profileAtom = atom<ProfileData>({
  profileImage: "",
  nickname: "",
  gender: "남성",
  age: 0,
  height: 0,
  weight: 0,
  target_weight: 0,
  allergies: "",
  foodPreferences: "",
});

export const loadingAtom = atom<boolean>(true);

export const errorAtom = atom<string | null>(null);

export const isEditingAtom = atom<boolean>(false);

export const fetchProfileAtom = atom(null, async (_get, set) => {
  set(loadingAtom, true);
  set(errorAtom, null);
  try {
    const res = await axios.get<ProfileData>(API_BASE_URL);
    set(profileAtom, res.data);
  } catch (error) {
    set(errorAtom, "프로필을 불러오는 중 오류가 발생했습니다.");
  } finally {
    set(loadingAtom, false);
  }
});

export const saveProfileAtom = atom(null, async (get, set) => {
  set(loadingAtom, true);
  try {
    await axios.put(API_BASE_URL, get(profileAtom));
    set(isEditingAtom, false);
    alert("프로필이 저장되었습니다!");
  } catch (error) {
    set(errorAtom, "프로필 저장 실패");
  } finally {
    set(loadingAtom, false);
  }
});
