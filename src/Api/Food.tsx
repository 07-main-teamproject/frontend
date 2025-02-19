import { instance, ENDPOINT } from './Instance';
import type { Food } from './types/getAllDiets';

// 음식 검색 API
export const searchFood = async (query: string) => {
  try {
    const response = await instance.get<Food[]>(
      `${ENDPOINT.food}?query=${query}`,
    );
    return response.data;
  } catch (error) {
    console.error('음식 검색 오류:', error);
    throw error;
  }
};
