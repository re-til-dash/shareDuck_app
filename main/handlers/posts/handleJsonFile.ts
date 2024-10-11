import fs from "fs";
import path from "path";
import createFolderSync from "../../utils/createFolder";
import hasLocalFile from "../../utils/hasLocalFile";
import getPost from "../../api/post/getPost";
import createLocalFile from "../../utils/createLocalFile";
import { userDataPath } from "../../config/window.config";

const FOLDER_NAME = "post";

export default async function handleGetPost(postId: string) {
  const FILE_NAME = `post.${postId}.json`;

  const filePath = path.join(userDataPath, FOLDER_NAME, FILE_NAME);

  if (hasLocalFile([FOLDER_NAME, FILE_NAME])) {
    try {
      const fileContent = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Error reading JSON file:", error);
      throw error;
    }
  }

  let result = await getPost(postId);
  if (!result) throw new Error(`Error: Get Post Data!!`);

  const content = JSON.stringify(result);
  createFolderSync(userDataPath, FOLDER_NAME);
  createLocalFile(FOLDER_NAME, FILE_NAME, content);

  return result;
}
