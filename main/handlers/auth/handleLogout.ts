import { store } from "../../config/store.config";

export default function handleLogout() {
  store.setToken("");

  return true;
}
