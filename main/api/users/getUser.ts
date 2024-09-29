import api from "../../config/api.config.ts";
//로그인 후 회원 정보 조회
export default async function getUsers(token: string) {
  try {
    const result = await api.get("/v1/users", {
      headers: {
        Authorization: token,
      },
    });

    return result.data;
  } catch (error) {
    console.log("get user", error);
  }
}
