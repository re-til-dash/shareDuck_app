//IPC 핸들러 정의

import { ipcMain } from "electron";
import handlers from "./config/handlers.config";

ipcMain.handle("get-user-info", async () => {
  // 로그인 사용자 정보 처리
  return { name: "User", id: "123" };
});
const keys = Object.keys(handlers);
keys.forEach((key) => {
  ipcMain.handle(`${key}-get-ipc`, async (e, ...args) => {
    const reuslt = handlers[key]?.get(args);
    return reuslt;
  });
  ipcMain.handle(`${key}-post-ipc`, async (e, ...args) => {
    const reuslt = handlers[key]?.post(args);
    return reuslt;
  });
  ipcMain.handle(`${key}-patch-ipc`, async (e, ...args) => {
    const reuslt = handlers[key]?.patch(args);
    return reuslt;
  });
  ipcMain.handle(`${key}-delete-ipc`, async (e, ...args) => {
    const reuslt = handlers[key]?.delete(args);
    return reuslt;
  });
});

export default { ipcMain };
