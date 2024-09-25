import api from "../config/api.config.ts";

export default async function getUsers() {
  return await api.get("/v1/users");
}
