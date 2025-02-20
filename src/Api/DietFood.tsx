import { instance, ENDPOINT } from './Instance';

// interface addFood = {

// }

// {
//   "external_ids": ["5025125000112"],     -> 여러 개 가능
//   "portion_size":  200 ,
//   "merge_quantity": true     -> 음식이 이미 존재하면 양만 수정 (true면 기존 양에 더함, false면 덮어씌움)
// }

// 특정 식단에 음식 추가
export const addFoodToDiet = async (
  dietId: string,
  foodData: { name: string; amount: number },
) => {
  try {
    const response = await instance.post(
      `${ENDPOINT.addDietFood}${dietId}/`,
      foodData,
    );
    return response.data;
  } catch (error) {
    console.error('식단에 음식 추가 오류:', error);
    throw error;
  }
};

// 특정 식단에서 음식 제거
export const removeFoodFromDiet = async (dietId: string, foodId: string) => {
  try {
    const response = await instance.delete(
      `${ENDPOINT.removeDietFood}${dietId}/`,
      {
        data: { foodId },
      },
    );
    return response.data;
  } catch (error) {
    console.error('식단에서 음식 제거 오류:', error);
    throw error;
  }
};

// 특정 식단의 음식 양 수정
export const updateFoodPortion = async (
  dietId: string,
  foodId: string,
  newAmount: number,
) => {
  try {
    const response = await instance.put(
      `${ENDPOINT.updateDietFood}${dietId}/`,
      {
        foodId,
        amount: newAmount,
      },
    );
    return response.data;
  } catch (error) {
    console.error('음식 양 수정 오류:', error);
    throw error;
  }
};
