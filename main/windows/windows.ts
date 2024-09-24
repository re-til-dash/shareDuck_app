<<<<<<< HEAD
import { BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
=======
import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { WINDOW_DEFAULT_SIZE } from "../config/window.config";
>>>>>>> main

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");
//창 관리 (BrowserWindow 인스턴스 생성, 관리)
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let mainWindow: BrowserWindow | null;
export default function createWindow() {
  mainWindow = new BrowserWindow({
<<<<<<< HEAD
=======
    frame: false,
    maximizable: false,

    ...WINDOW_DEFAULT_SIZE,
>>>>>>> main
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
<<<<<<< HEAD
=======
  return mainWindow;
>>>>>>> main
}
