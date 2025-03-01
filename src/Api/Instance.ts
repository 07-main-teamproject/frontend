import axios from 'axios';
import { localStorageKeys } from './Login';

const BASE_URL = import.meta.env.VITE_BASE_URL; // env base url 내용 설정

/**
 * 사용법
 * import instance from 'instance.ts 경로';
 *
 * get 요청(쿼리가 없을 때)
 * instance.get<response 데이터 타입>(ENDPOINT);
 *
 * get 요청(쿼리가 있을 때, value -> 변수값)
 * instance.get<response 데이터 타입>(ENDPOINT+`?query=${value}`);
 *
 * post 요청(value는 요청 시 보낼 값)
 * instance.post<response 데이터 타입>(ENDPOINT, value);
 *
 * put 요청(value는 요청 시 보낼 값)
 * instance.put<response 데이터 타입>(ENDPOINT, value);
 *
 */

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json', // 프론트에서 받을 데이터 타입
    'Content-Type': 'application/json', // 프론트에서 보내는 데이터 타입
  },
  withCredentials: true, // 쿠키나 인증 정보를 함께 보냄
});

instance.interceptors.request.use((config) => {
  const strAccessToken = localStorage.getItem(localStorageKeys.access_token);
  if (strAccessToken) {
    const accessToken = JSON.parse(strAccessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// instance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response.status === 401 && error.config) {
//       const response = await getAccessTokenWithRefreshToken(); // @수정: refresh token을 통해 accessToken을 가져오는 API
//       if (response) {
//         const strAccessToken = JSON.stringify(response.data)
//         localStorage.removeItem(localStorageKeys.accesstoken)
//         localStorage.setItem(localStorageKeys.accesstoken, strAccessToken)

//         // 새로운 토큰으로 수정
//         error.config.headers.accessToken = response.newAccessToken; // @수정: response 내에 accessToken 내용으로 수정
//         // 원래 요청을 다시 보내는 로직
//         const originalResponse = await axios.request(error.config);
//         return originalResponse; // 원래 api 요청의 response 반환
//       }
//     }
//   },
// );

// API endpoint
export const PATH = {
  USER: '/api/user',
  FOOD: '/api/food',
  DIET: '/api/diet',
  DIET_FOOD: '/api/dietfood',
};

export const ENDPOINT = {
  signup: PATH.USER + '/signup/',
  login: PATH.USER + '/login/',
  logout: PATH.USER + '/logout/',
  profile: PATH.USER + '/profile/',
  userinfo: PATH.USER + '/me/',

  food: PATH.FOOD + '/info/',
  dietDefault: PATH.DIET,
  dietCreate: PATH.DIET + '/create/',
  dietDelete: PATH.DIET + '/delete/',

  addDietFood: PATH.DIET_FOOD + '/add/',
  removeDietFood: PATH.DIET_FOOD + '/remove/',
  updateDietFood: PATH.DIET_FOOD + '/protionsize/',
};
