import { instance, ENDPOINT } from './Instance'

export const UserApi = {
  // 프로필 가져오기
  getProfile: async () => {
    const response = await instance.get(ENDPOINT.profile);
    return response.data;
  },

  // 프로필 생성
  createProfile: async (profileData: any) => {
    const response = await instance.post(ENDPOINT.profile, profileData);
    return response.data;
  },

  // 프로필 업데이트
  updateProfile: async (profileData: any) => {
    const response = await instance.put(ENDPOINT.profile, profileData);
    return response.data;
  },

  // 프로필 삭제
  deleteProfile: async () => {
    const response = await instance.delete(ENDPOINT.profile);
    return response.data;
  },
};
