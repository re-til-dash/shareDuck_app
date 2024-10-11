import createUser, { typeNewUser } from "../../api/users/createUser";

export default async function handlePostUser(data: typeNewUser) {
  const result = await createUser(data);

  return result;
}
