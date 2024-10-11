import fs from "fs";
import path from "path";
import hasLocalFile from "../../utils/hasLocalFile.ts";
import createLocalFile from "../../utils/createLocalFile.ts";
import createFolderSync from "../../utils/createFolder.ts";
import postCategories from "../../api/categories/postCategories.ts";
import { userDataPath } from "../../config/window.config.ts";

const FOLDER_NAME = "categories";
const FILE_NAME = "categories.json";

export default async function handlePostCategories(data) {
  const filePath = path.join(userDataPath, FOLDER_NAME, FILE_NAME);
  // 1. API 호출
  let result = await postCategories(data);
  //에러 메세지로 들어오는 경우
  if (typeof result === "string") {
    throw Error(result);
  }

  if (hasLocalFile([FOLDER_NAME, FILE_NAME])) {
    // 2. 파일이 존재하는지 확인
    try {
      // 3. 파일이 있으면 파일에서 기존 데이터 불러오기
      const fileContent = fs.readFileSync(filePath, "utf8");
      const prevData = JSON.parse(fileContent);
      prevData.push(result);
      // 기존 데이터에 새로운 데이터 추가하기
      fs.writeFileSync(filePath, JSON.stringify(prevData));
      return prevData;
    } catch (err) {
      console.error("Error reading local file:", err);
      // 파일을 읽는 중 오류가 발생하면 이후 로직
    }
  }

  // 4. 로컬에 파일이 없으므로 새로 생성
  const content = JSON.stringify(result);
  createFolderSync(userDataPath, FOLDER_NAME);
  createLocalFile(FOLDER_NAME, FILE_NAME, content);

  return result;
}
