import api from "../../config/api.config";

export type TypeRequestPostCategory = {
  // userId: number;
  categoryId: number;
  title?: string;
  content?: string;
  hashtags?: string[];
  properties?: {
    // 뭔지 모름
    additionalProp1: {};

    additionalProp2: {};
    additionalProp3: {};
  };
  thumbnailPath?: string;
};

export async function createPost(data: TypeRequestPostCategory) {
  try {
    const result = await api.post(`/posts`, data); // 예: 카테고리 데이터 가져오기
    return result.data;
  } catch (error) {
    return error;
  }
}
