//IPC 핸들러 정의

import { ipcMain } from "electron";

ipcMain.handle("get-user-info", async () => {
  // 로그인 사용자 정보 처리
  return { name: "User", id: "123" };
});

ipcMain.handle("fetch-data", async () => {
  // 외부 API 호출 처리
});

export default { ipcMain };
