import { instance, ENDPOINT } from './Instance';

export const UserApi = {
  // 프로필 가져오기
  getProfile: async () => {
    const response = await instance.get(ENDPOINT.profile);
    const profile = {
      name: response.data.name,
      age: response.data.age,
      profileImage: response.data.image,
      nickname: response.data.nickname,
      gender: response.data.gender,
      height: response.data.height,
      weight: response.data.weight,
      target_weight: response.data.target_weight,
      allergies: response.data.allergies,
      preferences: response.data.preferences,
    };
    return profile;
  },

  // 프로필 생성
  createProfile: async (profileData: any) => {
    const response = await instance.post(ENDPOINT.profile, profileData);
    return response.data;
  },

  // 프로필 업데이트
  updateProfile: async (profileData: any, isImageChanged: boolean) => {
    const bodyData = {
      ...profileData,
      image: profileData.profileImage,
    };
    if (!isImageChanged) {
      delete bodyData.image;
    }
    delete bodyData.profileImage;
    const response = await instance.put(ENDPOINT.profile, bodyData);
    return response.data;
  },

  // 프로필 삭제
  deleteProfile: async () => {
    const response = await instance.delete(ENDPOINT.profile);
    return response.data;
  },

  getUserInfo: async () => {
    const response = await instance.get(ENDPOINT.userinfo);
    return response.data;
  },
};
