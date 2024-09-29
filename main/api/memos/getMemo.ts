import api from "../../config/api.config";

export default async function getMemo() {
  return await api.get("/memos");
}
