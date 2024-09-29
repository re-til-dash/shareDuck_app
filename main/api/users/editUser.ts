import api from "../../config/api.config";

export default async function editUser(data, config = {}) {
  try {
    const result = await api.patch(`/v1/users`, data, config);

    return result.data;
  } catch (error) {
    console.log("edit user", error);
  }
  return null;
}
