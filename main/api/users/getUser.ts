import api from "../../config/api.config.ts";
//로그인 후 회원 정보 조회
export default async function getUsers() {
  return await api.get("/v1/users");
}
