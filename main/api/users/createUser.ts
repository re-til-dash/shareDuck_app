import api from "../../config/api.config.ts";

interface typeNewUser {
  email: string;
  name: string;
  password: string;
  profile: string;
}
//회원가입
export default async function createUser(data: typeNewUser, config = {}) {
  try {
    const result = await api.post("/v1/users", data, config);
    return result.data;
  } catch (error) {
    console.log("create user", error);
  }
}
