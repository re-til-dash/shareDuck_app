import fs from "fs";
import path from "path";
import hasLocalFile from "../../utils/hasLocalFile.ts";
import createLocalFile from "../../utils/createLocalFile.ts";
import { userDataPath } from "../../utils/createFolder.ts";
import patchCategories from "../../api/patchCatagories.ts";

const FILE_NAME = "categories.json";

export default async function handlePatchCategories(_e, [categoryId, newData]) {
  // 1. API 호출
  let result = await patchCategories(categoryId, newData);

  //에러 메세지로 들어오는 경우 바로 메세지 반환
  if (typeof result === "string") {
    return result;
  }

  const filePath = path.join(userDataPath, FILE_NAME);
  // 2. 파일이 존재하는지 확인
  if (hasLocalFile(userDataPath, FILE_NAME)) {
    try {
      // 3. 파일이 있으면 파일에서 기존 데이터 불러오기
      const fileContent = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContent);
      const newData = data.categories.map((category, index) => {
        const { id } = category;
        if (categoryId === id) {
          return newData;
        } else return category;
      });

      // 기존 데이터에 새로운 데이터 추가하기
      fs.writeFileSync(filePath, JSON.stringify({ categories: newData }));
      return result;
    } catch (err) {
      console.error("Error reading local file:", err);
      // 파일을 읽는 중 오류가 발생하면 이후 로직
    }
  }

  // 4. 로컬에 파일이 없으므로 새로 생성
  const content = JSON.stringify(result);
  createLocalFile("categories", FILE_NAME, content);

  return result;
}
