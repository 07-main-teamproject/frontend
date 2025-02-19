import { instance, ENDPOINT } from './Instance';
import { UserApi } from './User';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const localStorageKeys = {
  access_token: 'accesstoken',
  refresh_token: 'refreshtoken',
};

export const LoginApi = {
  login: async (data: LoginData) => {
    try {
      const response = await instance.post<LoginResponse>(ENDPOINT.login, data);
      const strAccessToken = JSON.stringify(response.data.access_token);
      localStorage.setItem(localStorageKeys.access_token, strAccessToken);
      const strRefreshToken = JSON.stringify(response.data.refresh_token);
      localStorage.setItem(localStorageKeys.refresh_token, strRefreshToken);
      const UserInfo = UserApi.getUserInfo();
      return UserInfo;
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
