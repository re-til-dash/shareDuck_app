import getUsers from "../../api/users/getUser";
import { store } from "../../config/store.config";

export default async function handleGetUser() {
  try {
    const currentUser = store.getToken();
    const result = await getUsers(currentUser as string);
    return !!result.data;
  } catch (error) {
    console.log("get user", error);
    return false;
  }
}
