//IPC 핸들러 정의

import { ipcMain } from "electron";
import handlers, { typeHandlers } from "./config/handlers.config.ts";

export type typeMethod = "get" | "post" | "patch" | "delete";
export default function registerIpcHandler(
  method: typeMethod,
  key: typeHandlers
) {
  ipcMain.handle(`${key}-${method}-ipc`, async (_e, ..._args) => {
    const handler = handlers[key]?.[method];
    return await handler(...(_args as [any, any]));
  });
}
