//memo render process 관련 처리 내용

import { BrowserWindow } from "electron";
import path from "node:path";
import {
  RENDERER_DIST,
  VITE_DEV_SERVER_URL,
  VITE_MEMO_SERVER_URL,
  __dirname,
} from "../config/window.config";

let memoWindow: BrowserWindow | null;

export default function createMemoWindow() {
  memoWindow = new BrowserWindow({
    frame: false,
    maximizable: false,
    width: 380,
    height: 560,
    resizable: false,
    icon: path.join(process.env.VITE_PUBLIC as string, "shareoluck-logo.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  // Test active push message to Renderer-process.
  memoWindow.webContents.on("did-finish-load", () => {
    memoWindow?.webContents.send(
      "memo-process-message",
      new Date().toLocaleString()
    );
  });
  if (VITE_MEMO_SERVER_URL) {
    memoWindow.loadURL(VITE_MEMO_SERVER_URL);
    memoWindow.webContents.openDevTools();
  } else {
    // win.loadFile('dist/index.html')

    memoWindow.loadFile(path.join(RENDERER_DIST, "memo.html"));
    memoWindow.setMenu(null);
  }

  return memoWindow;
}
