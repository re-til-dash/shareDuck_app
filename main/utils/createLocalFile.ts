import fs from "fs";
import path from "path";
import { userDataPath } from "./createFolder";
import hasLocalFile from "./hasLocalFile";

//폴더경로는 userData로 통일하여 내부에 여러 파일들을 생성하자.
export default function createLocalFile(
  foldername: string,
  filename: string,
  content: string | NodeJS.ArrayBufferView
) {
  // 파일이 생성될 경로
  const filePath = path.join(userDataPath, foldername, filename);

  // 파일 생성
  fs.writeFileSync(filePath, content, "utf-8");
}
