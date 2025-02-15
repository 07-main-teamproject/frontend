import axios from 'axios';

const API_BASE_URL = '/api/user/profile';

export const UserApi = {
  /**
   * 사용자 프로필 가져오기
   * @returns {Promise<any>} 사용자 프로필 데이터
   */
  getProfile: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('프로필 불러오기 실패:', error);
      throw error;
    }
  },

  /**
   * 사용자 프로필 업데이트
   * @param {Object} profileData - 업데이트할 프로필 데이터
   * @returns {Promise<any>} 업데이트된 프로필 데이터
   */
  updateProfile: async (profileData: Record<string, any>) => {
    try {
      const response = await axios.put(API_BASE_URL, { ...profileData });
      return response.data;
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      throw error;
    }
  },
};
