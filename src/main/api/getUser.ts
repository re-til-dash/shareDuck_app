import api from "../config/api.config.ts";

export default async function getUsers() {
  return await api.get("/api/v1/users");
}
