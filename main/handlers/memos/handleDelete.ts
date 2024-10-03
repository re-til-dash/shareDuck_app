import fs from "fs";
import path from "path";
import { userDataPath } from "../../utils/createFolder.ts";

const FOLDER_NAME = "memos";
const FILE_NAME = "memos.json";

export default function handleDeleteMemoById(id) {
  const filePath = path.join(userDataPath, FOLDER_NAME, FILE_NAME);

  try {
    const localMemos = fs.readFileSync(filePath, "utf8");
    const currentMemos = JSON.parse(localMemos);

    const exceptsMemos = currentMemos.content.filter((memo) => memo.id != id);

    fs.writeFileSync(filePath, JSON.stringify({ content: exceptsMemos }));

    return exceptsMemos;
  } catch (error) {
    console.log("delete memo", error);

    return error;
  }
}
