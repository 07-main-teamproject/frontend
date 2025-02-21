import { atom } from 'jotai';
import {
  getAllDiets,
  createDiet,
  getDietById,
  getDietByDate,
} from '../Api/Diet';
import {
  addFoodToDiet,
  removeFoodFromDiet,
  updateFoodPortion,
} from '../Api/DietFood';

// ✅ 전체 식단 목록 상태
export const dietListAtom = atom<{ id: number; name: string; date: string }[]>(
  [],
);

// ✅ 전체 식단 목록 불러오기
export const fetchDietsAtom = atom(null, async (_get, set) => {
  try {
    const data = await getAllDiets();
    console.log('🔥 전체 식단 목록:', data);
    set(dietListAtom, data);
  } catch (error) {
    console.error('❌ 식단 목록 불러오기 실패:', error);
  }
});

// ✅ 새로운 식단 추가
export const addDietAtom = atom(
  null,
  async (get, set, newDiet: { name: string; date: string }) => {
    try {
      const createdDiet = await createDiet(newDiet);
      set(dietListAtom, [...get(dietListAtom), createdDiet]); // 새로운 식단 추가
    } catch (error) {
      console.error('❌ 식단 추가 오류:', error);
    }
  },
);

// ✅ 현재 선택된 식단 (기본값: null)
export const dietAtom = atom<any | null>(null);

// ✅ 선택된 날짜 상태
export const selectedDateAtom = atom(new Date().toISOString().split('T')[0]);

// ✅ 개별 식단 데이터 불러오기
export const fetchDietAtom = atom(null, async (get, set, id?: string) => {
  try {
    let data;
    const selectedDate = get(selectedDateAtom);
    if (id) {
      data = await getDietById(id);
    } else {
      data = await getDietByDate(selectedDate);
    }
    console.log('🔥 불러온 개별 식단 데이터:', data);
    set(dietAtom, data);
  } catch (error) {
    console.error('❌ 개별 식단 조회 오류:', error);
  }
});

// ✅ 음식 추가 함수
export const addFoodAtom = atom(
  null,
  async (get, set, dietId: string, foodId: string) => {
    try {
      const response = await addFoodToDiet(dietId, {
        external_ids: [foodId],
        portion_size: 1,
        merge_quantity: true,
      });

      console.log('🔥 음식 추가 응답:', response);
      const prevDiet = get(dietAtom);
      if (prevDiet) {
        set(dietAtom, {
          ...prevDiet,
          diet_foods: [
            ...prevDiet.diet_foods,
            { food: response, portion_size: 1 },
          ],
        });
      }
    } catch (error) {
      console.error('❌ 음식 추가 오류:', error);
    }
  },
);

// ✅ 음식 삭제 함수
export const removeFoodAtom = atom(
  null,
  async (get, set, dietId: string, foodId: string) => {
    try {
      await removeFoodFromDiet(dietId, foodId);
      const prevDiet = get(dietAtom);
      if (prevDiet) {
        set(dietAtom, {
          ...prevDiet,
          diet_foods: prevDiet.diet_foods.filter(
            (food: any) => food.food.id !== foodId,
          ),
        });
      }
    } catch (error) {
      console.error('❌ 음식 삭제 오류:', error);
    }
  },
);

// ✅ 음식 양 수정 함수
export const updateFoodAmountAtom = atom(
  null,
  async (get, set, dietId: string, foodId: string, amount: number) => {
    try {
      await updateFoodPortion(dietId, foodId, amount);
      const prevDiet = get(dietAtom);
      if (prevDiet) {
        set(dietAtom, {
          ...prevDiet,
          diet_foods: prevDiet.diet_foods.map((food: any) =>
            food.food.id === foodId ? { ...food, portion_size: amount } : food,
          ),
        });
      }
    } catch (error) {
      console.error('❌ 음식 양 수정 오류:', error);
    }
  },
);
