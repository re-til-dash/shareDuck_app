import api from "../config/api.config";

export interface TypeReqCategoryData {
  name: string;
  properties: {
    [key: string]: {};
  };
}
export interface TypeResCategoryData {
  id: number;
  userId: number;
  name: string;
  properties: {
    [key: string]: {};
  };
}
export default async function postCategories(
  data: TypeReqCategoryData,
  config = {}
) {
  try {
    const result = await api.post(`/categories`, data, config); // 예: 카테고리 데이터 가져오기
    return result.data as TypeResCategoryData;
  } catch (error) {
    console.log("categories", error);
    return error.message;
  }
}
