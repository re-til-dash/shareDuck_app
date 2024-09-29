import { createPost } from "../../api/post/createPost";
import fs from "fs";
import path from "path";
import { userDataPath } from "../../utils/createFolder";
import hasLocalFile from "../../utils/hasLocalFile";
import createLocalFile from "../../utils/createLocalFile";

const FOLDER_NAME = "post";

// 이름 바꿨음,  handlePostNewPost -> handleCreatePost
// export default function handleCreatePost(_e, data) {
export default async function handleCreatePost(data) {
  // 1. API 호출
  let result = await createPost(data);

  //에러 메세지로 들어오는 경우 바로 메세지 반환
  if (typeof result === "string") {
    return result;
  }

  /**
   *
   * TODO:
   * 2. 임시 저장 지원할 수 있게, 오프라인 인 경우, temp prefix추가하여 온라인되었을 때 저장할 수 있도록 저장
   * ex) post.temp_[id].json
   *
   * 3. 온라인으로 전환되었을 때, 서버 부하가 걸리지 않게끔 한번에 너무 많은 api 요청을 하지 않도록 조정
   *
   * 4. userID는 양방향 암호화를 통해 로컬에 저장되어도 서버에서만 해독할 수 있도록 수정
   *
   * 5. 로컬 데이터가 해당 유저것이 맞는지?
   * 애초에 유저 아이디로 폴더구조 root가 생성되어야함, 왜냐면 같은 기기로 여러 유저가 사용할 수 있기 때문
   */

  const filePath = path.join(userDataPath, FOLDER_NAME);

  const postId = result.id;
  const FILE_NAME = `post.${postId}.json`;

  if (hasLocalFile(FOLDER_NAME, FILE_NAME)) {
    // 2. 파일이 존재하는지 확인
    try {
      // 3. 파일이 있으면 파일에서 기존 데이터 불러오기
      const fileContent = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContent);

      console.log(data);

      //!카테고리의 순서를 옮겨야 한다면 여기를 고쳐야함!
      data.categories.push(result);
      // 기존 데이터에 새로운 데이터 추가하기
      fs.writeFileSync(filePath, JSON.stringify(data));
      return result;
    } catch (err) {
      console.error("Error reading local file:", err);
      // 파일을 읽는 중 오류가 발생하면 이후 로직
    }
  }

  // 4. 로컬에 파일이 없으므로 새로 생성
  const content = JSON.stringify(result);
  createLocalFile(FOLDER_NAME, FILE_NAME, content);

  return result;
}
