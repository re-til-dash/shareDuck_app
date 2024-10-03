import api from "../../config/api.config";

export interface TypeLoginRequest {
  email: string;
  password: string;
}

export interface TypeLoginResponse {
  token: string; // 예시로 access token을 반환한다고 가정
}

export interface TypeResError {
  message: string;
}

export default async function login(data: TypeLoginRequest, config = {}) {
  try {
    const result = await api.post(`/login`, data, config); // 로그인 API 요청
    return result.data as TypeLoginResponse; // 성공 시 토큰 등의 응답 데이터
  } catch (error: any) {
    console.log("login error", error.response?.data || error.message);
    return error.response?.data as TypeResError; // 오류 처리
  }
}
