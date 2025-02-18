import { instance, ENDPOINT } from './Instance';

interface LoginData {
  email: string;
  password: string;
}

export const LoginApi = {
  login: async (data: LoginData) => {
    try {
      const response = await instance.post(ENDPOINT.login, data);
      return response.data;
    } catch (error) {
      console.log('로그인 오류:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await instance.post(ENDPOINT.logout);
      return response.data;
    } catch (error) {
      console.log('로그아웃 오류', error);
      throw error;
    }
  },
};
