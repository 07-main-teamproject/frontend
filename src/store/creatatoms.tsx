import { atom } from 'jotai';
import { getAllDiets, createDiet } from '../Api/Diet';

// 전체 식단 목록을 저장하는 Atom
export const dietListAtom = atom<{ id: number; name: string; date: string }[]>(
  [],
);

// API 호출하여 식단 목록 업데이트
export const fetchDietsAtom = atom(null, async (_get, set) => {
  try {
    const data = await getAllDiets();
    console.log(data);
    set(dietListAtom, data);
  } catch (error) {
    console.error('식단 목록 불러오기 실패:', error);
  }
});

// 새로운 식단 추가
export const addDietAtom = atom(
  null,
  async (get, set, newDiet: { name: string; date: string }) => {
    try {
      const createdDiet = await createDiet(newDiet);
      set(dietListAtom, [...get(dietListAtom), createdDiet]); // 새로운 식단 추가
    } catch (error) {
      console.error('식단 추가 오류:', error);
    }
  },
);
