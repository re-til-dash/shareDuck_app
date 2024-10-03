import fs from "fs";
import path from "path";
import getCategories from "../../api/categories/getCategories.ts";
import hasLocalFile from "../../utils/hasLocalFile.ts";
import createLocalFile from "../../utils/createLocalFile.ts";
import createFolderSync, { userDataPath } from "../../utils/createFolder.ts";

const FOLDER_NAME = "categories";
const FILE_NAME = "categories.json";

export default async function handleGetCategories() {
  const filePath = path.join(userDataPath, FOLDER_NAME, FILE_NAME);
  // 1. 파일이 존재하는지 확인
  if (hasLocalFile(FOLDER_NAME, FILE_NAME)) {
    try {
      // 2. 파일이 있으면 파일에서 데이터 읽기
      const fileContent = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContent);
      return data;
    } catch (err) {
      console.error("Error reading local file:", err);
      // 파일을 읽는 중 오류가 발생하면 이후 로직으로 API 호출
    }
  }

  // 3. 파일이 없거나 읽기 오류 발생 시 API 호출
  let result = await getCategories();
  // 4. API 결과가 없으면 기본 데이터 사용
  if (!result) {
    result = [];
  }

  // 5. 로컬에 파일이 없으므로 새로 생성
  const content = JSON.stringify(result);
  createFolderSync(FOLDER_NAME);
  createLocalFile(FOLDER_NAME, FILE_NAME, content);

  return result;
}
