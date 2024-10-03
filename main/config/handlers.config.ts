import handlePostLogin from "../handlers/auth/handlePost.ts";
import handleGetCategories from "../handlers/categories/handleGet.ts";
import handlePatchCategories from "../handlers/categories/handlePatch.ts";
import handlePostCategories from "../handlers/categories/handlePost.js";
import handleDeleteMemoById from "../handlers/memos/handleDelete.ts";
import handleGetMemo from "../handlers/memos/handleGet.ts";
import handlePostMemo from "../handlers/memos/handlePost.ts";
import handleCreatePost from "../handlers/posts/handleCreatePost.ts";
import handleDeletePostById from "../handlers/posts/handleDeleteId.ts";
import handleGetAllPosts from "../handlers/posts/handleGetAll.ts";
import handleGetPost from "../handlers/posts/handleJsonFile.ts";
import handlePatchPostById from "../handlers/posts/handlePatchId.ts";
import handlePostImgOfPost from "../handlers/posts/handlePostImg.ts";
import handleDeleteUser from "../handlers/users/handleDelete.ts";
import handleGetUser from "../handlers/users/handleGet.ts";
import handleGetAllUser from "../handlers/users/handleGetAll.ts";
import handleGetUserById from "../handlers/users/handleGetId.ts";
import handlePatchUser from "../handlers/users/handlePatch.ts";
import handlePatchPassword from "../handlers/users/handlePatchPw.ts";
import handlePostUser from "../handlers/users/handlePost.ts";

const handlers = {
  categories: {
    get: handleGetCategories,
    post: handlePostCategories,
    patch: handlePatchCategories,
    delete: () => {},
  },
  auth: {
    get: () => {},
    post: handlePostLogin, //로그인
    patch: () => {},
    delete: () => {},
  },
  user: {
    get: handleGetUser,
    post: handlePostUser, //회원가입
    patch: handlePatchUser,
    delete: handleDeleteUser,
  },
  userId: {
    get: handleGetUserById,
    post: handlePostCategories,
    patch: handlePatchPassword,
    delete: () => {},
  },
  users: {
    get: handleGetAllUser, //회원 리스트 조회
    post: () => {},
    patch: () => {},
    delete: () => {},
  },
  posts: {
    get: handleGetAllPosts,
    post: handleCreatePost,
    patch: () => {},
    delete: () => {},
  },
  postsId: {
    get: handleGetPost,
    post: handlePostImgOfPost,
    patch: handlePatchPostById,
    delete: handleDeletePostById,
  },
  memos: {
    get: handleGetMemo,
    post: handlePostMemo,
    patch: () => {},
    delete: handleDeleteMemoById,
  },
};

export type typeHandlers = keyof typeof handlers;

export default handlers;
