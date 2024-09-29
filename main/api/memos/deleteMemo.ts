import api from "../../config/api.config";

export default async function deleteMemo(memoId: number) {
  try {
    const result = await api.delete(`/memos/${memoId}`);

    return result.data;
  } catch (error) {
    console.log("get memo", error);
  }

  return null;
}
