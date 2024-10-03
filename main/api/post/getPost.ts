import api from "../../config/api.config";

export type Post = {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  content: string;
  hashtags: string[];
  properties: Record<string, string>;
  thumbnailPath: string;
  createdAt: string;
  modifiedAt: string;
  state: "PENDING" | "ACTIVE" | "DELETED";
};

export default async function getPost(postId: string) {
  try {
    const data = await api.get<Post>(`/posts/${postId}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
