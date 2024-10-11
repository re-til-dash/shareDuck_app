//메인 프로세스 진입점 파일

import { app, ipcMain } from "electron";

import createWindow from "./windows/windows.ts";
import registerIpcHandler, { typeMethod } from "./ipcHandlers.ts";
import handlers, { typeHandlers } from "./config/handlers.config.ts";
import { WINDOW_DEFAULT_SIZE } from "./config/window.config.ts";
import createMemoWindow from "./windows/memo.ts";
import handleGetMemo from "./handlers/memos/handleGet.ts";
import handlePostMemo from "./handlers/memos/handlePost.ts";
import handleDeleteMemoById from "./handlers/memos/handleDelete.ts";
import createTray from "./windows/tray.ts";
const methdos: typeMethod[] = ["get", "post", "patch", "delete"];
function initializeApp() {
  const keys = Object.keys(handlers) as typeHandlers[];
  methdos.forEach((method) => {
    keys.forEach((key) => registerIpcHandler(method, key));
  });

  const mainWindow = createWindow();
  const memoWindow = createMemoWindow();

  memoWindow.hide();

  ipcMain.on("title-bar-action", (_e, action, window = null) => {
    const targetWindow = window ? memoWindow : mainWindow;
    switch (action) {
      case "MIN": {
        targetWindow.setSize(
          WINDOW_DEFAULT_SIZE.width,
          WINDOW_DEFAULT_SIZE.height
        );
        break;
      }
      case "MAX": {
        targetWindow.setFullScreen(!targetWindow.isFullScreen());
        break;
      }
      case "CLOSE_MIN": {
        targetWindow.minimize();
        break;
      }
      case "CLOSE": {
        targetWindow.hide();
        break;
      }
      default:
        targetWindow.setSize(
          WINDOW_DEFAULT_SIZE.width,
          WINDOW_DEFAULT_SIZE.height
        );
    }
  });

  app.setName("shareDuck");

  ipcMain.on(
    "route-ipc",
    (_e, _message, payload: { id: number; category: any }) => {
      //todo: any => string
      //어느 윈도우로 보낼지 정확하게 적어주기
      memoWindow.webContents.send("route-reply-ipc", payload);
    }
  );
  ipcMain.on("memo-ipc", async (_e, message: string, payload: any) => {
    switch (message) {
      case "open": {
        memoWindow.show();

        break;
      }
      case "ready": {
        const result = await handleGetMemo(payload);
        _e.reply("memo-reply-ipc", result);
        break;
      }
      case "close": {
        break;
      }
      case "create": {
        const result = await handlePostMemo(payload);
        _e.reply("memo-reply-ipc", result);
        break;
      }
      case "delete": {
        const result = await handleDeleteMemoById(payload);
        _e.reply("memo-reply-ipc", result);
        break;
      }
      default: {
        console.error("잘못된 메모 요청");
      }
    }
  });

  createTray(mainWindow);
}

app.on("ready", initializeApp);
app.on("window-all-closed", () => {});

export default app;
