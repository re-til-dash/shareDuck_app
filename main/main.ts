//메인 프로세스 진입점 파일

import { app, ipcMain, screen } from "electron";

import createWindow from "./windows/windows.ts";
import registerIpcHandler, { typeMethod } from "./ipcHandlers.ts";
import handlers, { typeHandlers } from "./config/handlers.config.ts";
import { WINDOW_DEFAULT_SIZE } from "./config/window.config.ts";
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
}

app.on("ready", initializeApp);

export default app;
