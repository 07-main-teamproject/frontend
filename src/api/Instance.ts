import axios from 'axios';

const BASE_URL = ''; // env base url 내용 설정

/**
 * 사용법
 * import instance from 'instance.ts 경로';
 *
 * get 요청(쿼리가 없을 때)
 * instance.get<reponse 데이터 타입>(endpoint);
 *
 * get 요청(쿼리가 있을 때, value -> 변수값)
 * instance.get<reponse 데이터 타입>(endpoint+`?query=${value}`);
 *
 * post 요청(value는 요청 시 보낼 값)
 * instance.post<reponse 데이터 타입>(endpoint, value);
 *
 * put 요청(value는 요청 시 보낼 값)
 * instance.put<reponse 데이터 타입>(endpoint, value);
 *
 */

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

// API endpoint
export const path = {
  USER: '/api/user',
  DIET: '/api/diet',
  EXTERNAL: '/api/external',
};

export const endpoint = {
  signup: path.USER + '/signup/',
  login: path.USER + '/login/',
  logout: path.USER + '/logout/',
  profile: path.USER + '/profile/',
  calory: path.DIET + '/calculate-calories/',
  diet: path.DIET + '/diet/',
  food: path.EXTERNAL + '/food/info/',
};