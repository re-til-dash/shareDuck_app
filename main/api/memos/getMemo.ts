import api from "../../config/api.config";

export default async function getMemo(params) {
  try {
    const result = await api.get(`/memos`, { params });

    return result.data;
  } catch (error) {
    console.log("get memo", error.message);
  }

  return null;
}
