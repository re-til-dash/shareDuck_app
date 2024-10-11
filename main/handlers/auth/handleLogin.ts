import login from "../../api/auth/login";
import { store } from "../../config/store.config";
//! 렌더 프로세스에서는 토큰의 유무만 확인할 수 있게 할 것.
export default async function handleLogin({ email, password }) {
  const result = await login({ email, password });
  if (store.isAvailableStorage()) {
    store.setToken(result);
    return true;
  }

  return false;
}
