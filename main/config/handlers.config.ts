import getUsers from "../api/getUser.ts";
import postUsers from "../api/postUsers.ts";
import handleGetCategories from "../handlers/categories/handleGet.ts";
import handlePatchCategories from "../handlers/categories/handlePatch.ts";
import handlePostCategories from "../handlers/categories/handlePost.js";

const handlers = {
  categories: {
    get: handleGetCategories,
    post: handlePostCategories,
    patch: handlePatchCategories,
    delete: () => {},
  },
  users: {
    get: getUsers,
    post: postUsers,
    patch: () => {},
    delete: () => {},
  },
};

export type typeHandlers = keyof typeof handlers;

export default handlers;
