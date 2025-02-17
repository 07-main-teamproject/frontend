import { instance, endpoint } from './instance';

export const UserApi = {
  // 프로필 가져오기
  getProfile: async () => {
    const response = await instance.get(endpoint.profile);
    return response.data;
  },

  // 프로필 업데이트
  updateProfile: async (profileData: any) => {
    const response = await instance.put(endpoint.profile, profileData);
    return response.data;
  },
};