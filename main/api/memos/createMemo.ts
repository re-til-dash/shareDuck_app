import api from "../../config/api.config";

export default async function createMemo(data, config = {}) {
  return await api.post("/memos", data, config);
}
