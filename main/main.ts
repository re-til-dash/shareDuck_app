//메인 프로세스 진입점 파일

import { app, ipcMain, screen } from "electron";

import createWindow from "./windows/windows.ts";
import registerIpcHandler, { typeMethod } from "./ipcHandlers.ts";
import handlers, { typeHandlers } from "./config/handlers.config.ts";
<<<<<<< HEAD
=======
import { WINDOW_DEFAULT_SIZE } from "./config/window.config.ts";
>>>>>>> main
const methdos: typeMethod[] = ["get", "post", "patch", "delete"];
function initializeApp() {
  const keys = Object.keys(handlers) as typeHandlers[];
  methdos.forEach((method) => {
    keys.forEach((key) => registerIpcHandler(method, key));
  });

<<<<<<< HEAD
  createWindow();
=======
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
        //!!개발모드에서만 다음코드 사용
        app.quit();
        break;
      }
      default:
        mainWindow.setSize(
          WINDOW_DEFAULT_SIZE.width,
          WINDOW_DEFAULT_SIZE.height
        );
    }
  });

>>>>>>> main
  app.setName("shareDuck");
}

app.on("ready", initializeApp);

export default app;
