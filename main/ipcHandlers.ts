//IPC 핸들러 정의

import { ipcMain } from "electron";
import handlers from "./config/handlers.config.ts";

ipcMain.handle("get-user-info", async () => {
  // 로그인 사용자 정보 처리
  return { name: "User", id: "123" };
});
type typeHandlers = keyof typeof handlers;
const keys = Object.keys(handlers) as typeHandlers[];

keys.forEach((key) => {
  ipcMain.handle(`${key}-get-ipc`, async (_e, ..._args) => {
    const reuslt = handlers[key]?.get();
    return reuslt;
  });
  ipcMain.handle(`${key}-post-ipc`, async (_e, ..._args) => {
    if (!handlers[key].post) return;
    // const reuslt = handlers[key]?.post(_args);
    // return reuslt;
  });
  //todo: 인자 수정 필요
  ipcMain.handle(`${key}-patch-ipc`, async (_e, ..._args) => {
    if (!handlers[key].patch) return;
    const reuslt = handlers[key]?.patch();
    return reuslt;
  });

  //todo: 인자 수정 필요
  ipcMain.handle(`${key}-delete-ipc`, async (_e, ..._args) => {
    if (!handlers[key].delete) return;
    const reuslt = handlers[key]?.delete();
    return reuslt;
  });
});

export default { ipcMain };
