import getCategories from "../api/getCategories.ts";
import getUsers from "../api/getUser.ts";
import postUsers from "../api/postUsers.ts";

const handlers = {
  catgories: {
    get: getCategories,
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

export default handlers;
