//메인 프로세스 진입점 파일

import { app } from "electron";

import createWindow from "./windows/windows.ts";
import registerIpcHandler from "./ipcHandlers.ts";
import handlers, { typeHandlers } from "./config/handlers.config.ts";
function initializeApp() {
  // app.setName("shareDuck");
  const keys = Object.keys(handlers) as typeHandlers[];
  ["get", "post", "patch", "delete"].forEach((method) => {
    keys.forEach((key) => registerIpcHandler(method, key));
  });

  createWindow();
}

app.on("ready", initializeApp);

export default app;
