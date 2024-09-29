import api from "../../config/api.config";

export default async function getUserById(idx: string, config = {}) {
  try {
    const result = await api.get(`/v1/users/${idx}`, config);

    return result.data;
  } catch (error) {
    console.log("get user by id", error);
  }

  return null;
}
