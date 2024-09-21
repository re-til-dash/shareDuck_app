//IPC 핸들러 정의

import { ipcMain } from "electron";
import handlers from "./config/handlers.config.ts";

ipcMain.handle("get-user-info", async () => {
  // 로그인 사용자 정보 처리
  return { name: "User", id: "123" };
});
type typeHandlers = keyof typeof handlers;
const keys = Object.keys(handlers) as typeHandlers[];

const registerIpcHandler = (method: string, key: typeHandlers) => {
  ipcMain.handle(`${key}-${method}-ipc`, async (_e, ..._args) => {
    const handler = handlers[key]?.[method];
    if (!handler) return;
    return await handler(..._args);
  });
};

["get", "post", "patch", "delete"].forEach((method) => {
  keys.forEach((key) => registerIpcHandler(method, key));
});

export default { ipcMain };
