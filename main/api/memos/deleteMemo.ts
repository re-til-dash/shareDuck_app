import api from "../../config/api.config";

export default async function deleteMemo(memoId) {
  return await api.delete(`/memos/${memoId}`);
}
