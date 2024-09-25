import api from "../config/api.config";
import { TypeReqCategoryData, TypeResCategoryData } from "./postCategories";

export default async function patchCategories(
  categoryId: number,
  data: TypeReqCategoryData,
  config = {}
) {
  try {
    const result = await api.patch(`/categories/${categoryId}`, data, config); // 예: 카테고리 데이터 가져오기
    return result.data as TypeResCategoryData;
  } catch (error) {
    console.log("categories", error);
  }
  return null;
}
