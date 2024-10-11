import getMemo from "../../api/memos/getMemo";
import createFolderSync from "../../utils/createFolder";
import hasLocalFile from "../../utils/hasLocalFile";
import path from "path";
import fs from "fs";
import createLocalFile from "../../utils/createLocalFile";
import { userDataPath } from "../../config/window.config";

const FOLDER_NAME = "memos";
const FILE_NAME = "memos.json";
export default async function handleGetMemo({
  categoryId,
  keyword,
  page,
  size,
}: {
  categoryId: number;
  keyword: string;
  page: number;
  size: number;
}) {
  const filePath = path.join(userDataPath, FOLDER_NAME, FILE_NAME);
  if (hasLocalFile([FOLDER_NAME, FILE_NAME])) {
    try {
      // 2. 파일이 있으면 파일에서 데이터 읽기
      const fileContent = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContent);
      return data.content;
    } catch (err) {
      console.error("Error reading local file:", err);
      // 파일을 읽는 중 오류가 발생하면 이후 로직으로 API 호출
    }
  }
  // 3. 파일이 없거나 읽기 오류 발생 시 API 호출
  let result = await getMemo({ categoryId, keyword, page, size });
  // 4. API 결과가 없으면 기본 데이터 사용
  if (typeof result === "string" || !result) {
    result = {
      content: [],
    };
  }
  //? 메모를 찾을 수 없는지, 메모가 아예 없는지 확인하는 방법

  // 5. 로컬에 파일이 없으므로 새로 생성
  const content = JSON.stringify(result);
  createFolderSync(userDataPath, FOLDER_NAME);
  createLocalFile(FOLDER_NAME, FILE_NAME, content);
  return result.content;
}
