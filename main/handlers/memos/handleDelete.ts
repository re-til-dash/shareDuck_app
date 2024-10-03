import fs from "fs";
import path from "path";
import hasLocalFile from "../../utils/hasLocalFile.ts";
import createLocalFile from "../../utils/createLocalFile.ts";
import createFolderSync, { userDataPath } from "../../utils/createFolder.ts";

const FOLDER_NAME = "categories";
const FILE_NAME = "categories.json";

export default function handleDeleteMemoById(targetMemo) {
  const filePath = path.join(userDataPath, FOLDER_NAME, FILE_NAME);

  try {
    const localMemos = fs.readFileSync(filePath, "utf8");
    const currentMemos = JSON.parse(localMemos);

    const exceptsMemos = currentMemos.content.filter(
      (memo) => memo.id === targetMemo.id
    );

    fs.writeFileSync(filePath, JSON.stringify({ content: exceptsMemos }));

    return exceptsMemos.content;
  } catch (error) {
    console.log("create memo", error);

    return error;
  }
}
