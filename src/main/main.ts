//메인 프로세스 진입점 파일

import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);

export default app;
