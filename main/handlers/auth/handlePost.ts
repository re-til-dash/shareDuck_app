import login from "../../api/auth/login";

export default async function handlePostLogin({ email, password }) {
  const result = await login({ email, password });

  return result;
}
