import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL; // env base url 내용 설정

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
  FOOD: '/api/external',
  DIET: '/api/diet',
  DIETFOOD: '/api/dietfood',
};

export const endpoint = {
  signup: path.USER + '/signup/',
  login: path.USER + '/login/',
  logout: path.USER + '/logout/',
  profile: path.USER + '/profile/',

  food: path.FOOD + '/info/',
  dietCreate: path.DIET + '/create/',
  dietDelete: path.DIET + '/delete/',

  addDietFood: path.DIETFOOD + '/add/',
  removeDietFood: path.DIETFOOD + '/remove/',
  updateDietFood: path.DIETFOOD + '/protionsize/',
};
