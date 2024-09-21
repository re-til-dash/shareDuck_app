import { BrowserWindow } from "electron";
import path from "path";
//창 관리 (BrowserWindow 인스턴스 생성, 관리)
export default function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:3000");
}
