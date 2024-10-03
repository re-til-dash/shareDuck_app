import fs from "fs";
import path from "path";
import hasLocalFile from "../../utils/hasLocalFile.ts";
import createLocalFile from "../../utils/createLocalFile.ts";
import createFolderSync, { userDataPath } from "../../utils/createFolder.ts";

const FOLDER_NAME = "categories";
const FILE_NAME = "categories.json";

export default async function handleDeleteCategoryById(categoryId: number) {
  const filePath = path.join(userDataPath, FOLDER_NAME, FILE_NAME);
  // 3. 파일이 있으면 파일에서 기존 데이터 불러오기
  const fileContent = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContent);
  try {
    const newData = data.filter(({ id }) => categoryId != id);

    // 기존 데이터에 새로운 데이터 추가하기
    fs.writeFileSync(filePath, JSON.stringify(newData));
    return newData;
  } catch (err) {
    console.error("Error reading local file:", err);
    // 파일을 읽는 중 오류가 발생하면 이후 로직
  }

  return;
  /**
  // 1. API 호출


  //에러 메세지로 들어오는 경우 바로 메세지 반환
  if (typeof result === "string" || !result) {
    return result;
  }
  // 4. 로컬에 파일이 없으므로 새로 생성
  const content = JSON.stringify(result);
  createFolderSync(FOLDER_NAME);
  createLocalFile(FOLDER_NAME, FILE_NAME, content);

  return result;
   */
}
