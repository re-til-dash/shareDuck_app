//IPC 핸들러 정의

import { ipcMain } from "electron";
import handlers, { typeHandlers } from "./config/handlers.config.ts";
// 'get-user-data' 채널에 대한 핸들러 등록
ipcMain.handle("get-user-data", async (event, userId) => {
  // 메인 프로세스에서 처리할 로직
  const userData = { id: userId, name: "John Doe", email: "john@example.com" };

  // 결과를 렌더러 프로세스에 반환
  return userData;
});

export default function registerIpcHandler(method: string, key: typeHandlers) {
  ipcMain.handle(`${key}-${method}-ipc`, async (_e, ..._args) => {
    const handler = handlers[key]?.[method];
    return await handler(..._args);
  });
}
