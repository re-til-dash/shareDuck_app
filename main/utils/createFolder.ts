import { app } from "electron";
import fs from "fs";
import path from "path";
import { userDataPath } from "../config/window.config";

export default function createFolderSync(paths: string, foldername: string) {
  // userData 경로 확인 및 폴더 존재 여부 검사

  // 경로가 존재하는지 확인
  if (!fs.existsSync(paths)) {
    fs.mkdirSync(paths, { recursive: true });
    console.log("created userData folder");
  }

  // 폴더가 생성될 경로
  const folderPath = path.join(paths, foldername);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return folderPath;
}
