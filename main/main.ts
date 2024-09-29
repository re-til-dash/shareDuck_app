//메인 프로세스 진입점 파일

import { app, ipcMain } from "electron";

import createWindow from "./windows/windows.ts";
import registerIpcHandler, { typeMethod } from "./ipcHandlers.ts";
import handlers, { typeHandlers } from "./config/handlers.config.ts";
import { WINDOW_DEFAULT_SIZE } from "./config/window.config.ts";
import createMemoWindow from "./windows/memo.ts";
const methdos: typeMethod[] = ["get", "post", "patch", "delete"];
function initializeApp() {
  const keys = Object.keys(handlers) as typeHandlers[];
  methdos.forEach((method) => {
    keys.forEach((key) => registerIpcHandler(method, key));
  });

  const mainWindow = createWindow();

  ipcMain.on("title-bar-action", (_e, action) => {
    switch (action) {
      case "MIN": {
        mainWindow.setSize(
          WINDOW_DEFAULT_SIZE.width,
          WINDOW_DEFAULT_SIZE.height
        );
        break;
      }
      case "MAX": {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
        break;
      }
      case "CLOSE_MIN": {
        mainWindow.minimize();
        break;
      }
      case "CLOSE": {
        mainWindow.close();
        break;
      }
      default:
        mainWindow.setSize(
          WINDOW_DEFAULT_SIZE.width,
          WINDOW_DEFAULT_SIZE.height
        );
    }
  });

  app.setName("shareDuck");

  ipcMain.on("memo-ipc", (_e, message: string) => {
    switch (message) {
      case "open": {
        createMemoWindow();
        break;
      }
      case "close": {
        break;
      }
      case "insert": {
        break;
      }
      default: {
        console.error("잘못된 메모 요청");
      }
    }
  });
}

app.on("ready", initializeApp);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

export default app;
