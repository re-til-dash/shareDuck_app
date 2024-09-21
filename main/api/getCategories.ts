import api from "../config/api.config.ts";

export default async function getCategories() {
  return await api.get("/api/categories");
}
