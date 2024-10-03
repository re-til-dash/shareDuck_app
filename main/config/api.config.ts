/* eslint-disable @typescript-eslint/no-var-requires */

import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_KEY;
const testToken = import.meta.env.VITE_TOKEN_KEY;

const api = axios.create({
  headers: {
    "Content-Type": "application/json;  charset=utf-8",
    Authorization: `Baerer ${testToken}`,
  },
});

api.defaults.baseURL = baseURL;
// 모든 요청은 시간 초과 전 2.5초 대기하는 인스턴스를 사용합니다.
//api.defaults.timeout = 2500;

// 요청 인터셉터
api.interceptors.request.use(
  function (config: any) {
    // 요청이 전달되기 전에 작업 수행
    //todo: JWT 토큰 추가
    return config;
  },
  function (error: any) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터
// api.interceptors.response.use(
//   function (response: any) {
//     // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 데이터가 있는 작업 수행
//     return response;
//   },
//   function (error: any) {
//     // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 오류가 있는 작업 수행
//     return Promise.reject(error);
//   }
// );

// 인터셉터 제거 (필요 시)
// const myInterceptor = axios.interceptors.request.use(function () {
// });
// api.interceptors.request.eject(myInterceptor);
export default api;
