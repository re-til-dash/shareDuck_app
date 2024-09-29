import api from "../../config/api.config";

export default async function createMemo(data, config = {}) {
  try {
    const result = await api.post("/memos", data, config);

    return result.data;
  } catch (error) {
    console.log("get memo", error);
  }

  return null;
}
