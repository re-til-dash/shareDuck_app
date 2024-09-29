import api from "../../config/api.config";

export default async function getMemo() {
  try {
    const result = await api.get("/memos");

    return result.data;
  } catch (error) {
    console.log("get memo", error);
  }

  return null;
}
