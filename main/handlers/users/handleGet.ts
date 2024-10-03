import getUsers from "../../api/users/getUser";

export default async function handleGetUser(token: string) {
  if (process.env.NODE_ENV === "development" && !token) {
    token = import.meta.env.VITE_TOKEN_KEY;
    const result = await getUsers(token);
    return result;
  }
  const result = await getUsers(token);
  return result;
}
