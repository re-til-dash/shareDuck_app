// home render process 관련 처리 내용

import { BrowserWindow } from "electron";
import path from "node:path";
import {
  RENDERER_DIST,
  VITE_DEV_SERVER_URL,
  WINDOW_DEFAULT_SIZE,
  __dirname,
} from "../config/window.config";

// const require = createRequire(import.meta.url)

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
//창 관리 (BrowserWindow 인스턴스 생성, 관리)
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x

let mainWindow: BrowserWindow | null;

export default function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    maximizable: false,

    ...WINDOW_DEFAULT_SIZE,
    icon: path.join(process.env.VITE_PUBLIC as string, "shareoluck-logo.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Test active push message to Renderer-process.
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
    );
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    // win.loadFile('dist/index.html')

    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
    mainWindow.setMenu(null);
  }
  return mainWindow;
}
