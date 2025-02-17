import { instance, ENDPOINT } from './Instance';

interface SignupData {
  email: string;
  password: string;
  nickname: string;
}

export const SignupApi = {
  // 회원가입 요청 (POST)
  signup: async (data: SignupData) => {
    try {
      const response = await instance.post(ENDPOINT.signup, data);
      return response.data;
    } catch (error) {
      console.error('회원가입 오류:', error);
      throw error;
    }
  },
};
