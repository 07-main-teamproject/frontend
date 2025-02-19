import { instance, ENDPOINT } from './Instance';
import { UserApi } from './User';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  accesstoken: string;
  refreshtoken: string;
}

export const localStorageKeys = {
  accesstoken: 'accesstoken',
  refreshtoken: 'refreshtoken',
};

export const LoginApi = {
  login: async (data: LoginData) => {
    try {
      const response = await instance.post<LoginResponse>(ENDPOINT.login, data);
      const strAccessToken = JSON.stringify(response.data.accesstoken);
      localStorage.setItem(localStorageKeys.accesstoken, strAccessToken);
      const strRefreshToken = JSON.stringify(response.data.refreshtoken);
      localStorage.setItem(localStorageKeys.refreshtoken, strRefreshToken);
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
