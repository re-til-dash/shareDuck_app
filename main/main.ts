//메인 프로세스 진입점 파일

import { app } from "electron";

import createWindow from "./windows/windows";
import initializeApp from "./app";

app.on("ready", createWindow);
app.on("activate", initializeApp);

export default app;
