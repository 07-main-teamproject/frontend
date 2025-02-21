import { instance, ENDPOINT } from './Instance';
import type { AllDietsResponse } from './types/getAllDiets';
// 전체 식단 목록 조회
export const getAllDiets = async (): Promise<AllDietsResponse[]> => {
  try {
    const response = await instance.get<AllDietsResponse[]>(
      ENDPOINT.dietDefault,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('식단 목록 조회 오류:', error);
    throw error;
  }
};

// 특정 식단 조회
export const getDietById = async (dietId: string) => {
  try {
    const response = await instance.get(`${ENDPOINT.dietDefault}/${dietId}/`);
    return response.data;
  } catch (error) {
    console.error('식단 조회 오류:', error);
    throw error;
  }
};

// 특정 날짜의 식단 조회
export const getDietByDate = async (date: string) => {
  try {
    const response = await instance.get(`${ENDPOINT.dietDefault}?date=${date}`);
    return response.data;
  } catch (error) {
    console.error('날짜별 식단 조회 오류:', error);
    throw error;
  }
};

// 새로운 식단 생성
export const createDiet = async (dietData: { name: string; date: string }) => {
  try {
    const response = await instance.post(ENDPOINT.dietCreate, dietData);
    return response.data;
  } catch (error) {
    console.error('식단 생성 오류:', error);
    throw error;
  }
};

// 식단 삭제
export const deleteDiet = async (dietId: string) => {
  try {
    const response = await instance.delete(`${ENDPOINT.dietDelete}${dietId}/`);
    return response.data;
  } catch (error) {
    console.error('식단 삭제 오류:', error);
    throw error;
  }
};
