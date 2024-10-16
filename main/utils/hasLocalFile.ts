import fs from "fs";
import path from "path";
import { userDataPath } from "../config/window.config";

export default function hasLocalFile(paths: string[]): boolean {
  // 주어진 폴더 경로와 파일명을 합쳐 전체 파일 경로 생성
  const filePath = path.join(userDataPath, ...paths);

  // 파일이 존재하는지 확인 (true/false 반환)
  return fs.existsSync(filePath);
}
