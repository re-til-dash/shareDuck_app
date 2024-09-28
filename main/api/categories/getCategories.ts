import api from "../../config/api.config.ts";

interface typeRespose {
  categories: Array<{
    id: number;
    name: string;
    properties: object;
  }>;
}

export default async function getCategories() {
  try {
    const data = await api.get("/categories"); // 예: 카테고리 데이터 가져오기
    const cleanedData: typeRespose = {
      categories: data.data, // 필요한 데이터만 전송
    };
    return cleanedData;
  } catch (error) {
    console.log("categories", error);
  }
  return null;
}
