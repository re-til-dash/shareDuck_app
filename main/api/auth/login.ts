import api from "../../config/api.config";
/**
 * 
 * @param data 
 * {
  "email": "<string>",
  "password": "<string>"
}
 * @param config 
 * @returns 
 */
export default async function login(data, config = {}) {
  try {
    const result = await api.post(`/login`, data, config);

    return result.headers["authorization"];
  } catch (error) {
    console.log("login", error.response.data.message);
  }

  return null;
}
