import api from "../../config/api.config";

export default async function editPW(password: string, config = {}) {
  try {
    const result = await api.patch(`/v1/usres/password`, password, config);

    return result.status;
  } catch (error) {
    console.log("edit password", error);
  }

  return null;
}
