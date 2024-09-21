//메인 프로세스 진입점 파일

import { app } from "electron";

import createWindow from "./windows/windows.ts";
import initializeApp from "./app.ts";

app.on("ready", createWindow);
app.on("activate", initializeApp);

export default app;
