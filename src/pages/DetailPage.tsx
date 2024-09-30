import React from "react";
import { useParams } from "react-router-dom";

export const DetailPage = () => {
  const { postId } = useParams();
  console.log(postId);

  return <div>DetailPag sdsde</div>;
};
