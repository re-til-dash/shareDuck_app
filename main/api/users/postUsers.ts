import api from "../../config/api.config.ts";

interface typeNewUser {
  email: string;
  name: string;
  password: string;
  profile: string;
}

export default async function postUsers(data: typeNewUser) {
  const config = {};
  return api.post("/v1/users", data, config);
}
