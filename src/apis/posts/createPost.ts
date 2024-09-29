import api from "../../../main/config/api.config";

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
export async function uploadImg(file: File, postId: number) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("postId", postId.toString());

  try {
    const response = await api.post("/upload/post-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const location = response.headers["location"];
    if (!location) {
      throw new Error("No Location header in response");
    }

    return location;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
