import path from "path";
import fs from "fs";
import { userDataPath } from "../../config/window.config";
const FOLDER_NAME = "memos";
const FILE_NAME = "memos.json";
export default function handlePostMemo(newMemo) {
  const filePath = path.join(userDataPath, FOLDER_NAME, FILE_NAME);

  try {
    const localMemos = fs.readFileSync(filePath, "utf8");
    const currentMemos = JSON.parse(localMemos);
    //! 임시 아이디: 백엔드와 상의해서 다시 작성할 것
    const newId = currentMemos.content.length;
    newMemo.id = newId;
    currentMemos.content.push(newMemo);

    fs.writeFileSync(filePath, JSON.stringify(currentMemos));

    return currentMemos.content;
  } catch (error) {
    console.log("create memo", error);

    return error;
  }
}
