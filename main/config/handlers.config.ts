import getUsers from "../api/getUser.ts";
import postUsers from "../api/postUsers.ts";
import handleGetCategories from "../handlers/categories/handleGet.ts";

const handlers = {
  categories: {
    get: handleGetCategories,
    post: () => {},
    patch: () => {},
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
