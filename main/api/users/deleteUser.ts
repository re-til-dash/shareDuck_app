import api from "../../config/api.config";
//사용자 삭제
export default async function deleteUser() {
  try {
    const result = await api.delete(`/v1/users`);

    return result.status;
  } catch (error) {
    console.log("delete user", error);
  }

  return null;
}
