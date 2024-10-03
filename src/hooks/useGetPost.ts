import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// TODO: main, renderer쪽 타입을 하나로 어케 두지?
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

export const useGetPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const getPost = async () => {
      const data = await window.shareDuck.invoke(
        "postsId-get-ipc",
        `${postId}`
      );
      setPost(data);
    };

    getPost();
  }, [postId]);

  return { post };
};
