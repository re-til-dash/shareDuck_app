//메인 프로세스 진입점 파일

import { app } from "electron";

import createWindow from "./windows/windows.ts";
function initializeApp() {
  app.setName("shareDuck");
  // 그 외 앱 초기화 작업들
}

app.on("ready", createWindow);
app.on("activate", initializeApp);

export default app;
