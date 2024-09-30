import api from "../../config/api.config";

export default async function getMemo(
  categoryId: number,
  keyword: string,
  page: number,
  size = 1,
  sort = ""
) {
  try {
    const result = await api.get(
      `/memos?categoryId=${categoryId}&keyword=${keyword}&page=${page}&size=${size}&sort=${[sort]}`
    );

    return result.data;
  } catch (error) {
    console.log("get memo", error.message);
  }

  return null;
}
