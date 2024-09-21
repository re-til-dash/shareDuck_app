import getCategories from "../api/getCategories";
import getUsers from "../api/getUser";
import postUsers from "../api/postUsers";

const handlers = {
  catgories: { get: getCategories, post: null, patch: null, delete: null },
  users: { get: getUsers, post: postUsers, patch: null, delete: null },
};

export default handlers;
