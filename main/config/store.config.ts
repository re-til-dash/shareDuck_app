import path from "path";
import fs from "fs";
import { userDataPath } from "./window.config";
import createFolderSync from "../utils/createFolder";
import hasLocalFile from "../utils/hasLocalFile";
import createLocalFile from "../utils/createLocalFile";
//TODO: safeStorage 공부 후 해당 스토리지로 교체
class User {
  public userInfo: {
    userId: string;
  };
  private token: Buffer | string;

  getToken() {
    // return safeStorage.decryptString(this.token);
    return this.token;
  }

  setToken(token) {
    // this.token = safeStorage.encryptString(token);
    return (this.token = token);
  }

  getUserInfo() {
    return this.userInfo;
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo;

    return this.userInfo;
  }
}

class Store extends User {
  isAvaiableAccessStore: boolean;
  userPath: string;
  lastLocalModifiedAt: string; //마지막으로 로컬 파일이 수정된 시간
  defaultFiles: string[]; //사용자가 가지고 있는 파일
  defaultFilesPath: { [key: string]: string }; //defaultFiles의 실제 경로

  constructor() {
    super();
  }

  setStorage() {
    // this.ready = safeStorage.isEncryptionAvailable();
    this.isAvaiableAccessStore = true;
    return this.isAvaiableAccessStore;
  }

  isAvailableStorage() {
    return this.isAvaiableAccessStore;
  }

  //현재 사용자의 userId를 사용하여 경로 생성
  createUserFolder() {
    try {
      const currentUser = this.userInfo.userId;
      if (!currentUser) throw Error("fail to read user info");
      this.userPath = createFolderSync(userDataPath, currentUser);
    } catch (error) {
      throw Error(error);
    }

    return this.userPath;
  }

  /**
   *
   * @param folders
   * @description 회원가입 후 처음 로그인한 유저의 로컬에 기본 폴더 일괄 생성 or 다른 기기에서 최초 접속한 기존 유저의 폴더 일괄 생성
   * @returns object 폴더명: 생성된 폴더 경로
   *
   * [userId]
   * ㄴ[folder]
   *    ㄴ[post].json
   * ㄴmemo.json
   */
  createUserRootFolders<T extends string>(folders: T[]) {
    const defaultFolders = folders.map((folder) => ({
      [folder]: hasLocalFile([this.userInfo.userId, folder])
        ? path.join(this.userPath, folder)
        : createFolderSync(this.userPath, folder),
    }));

    return { ...defaultFolders } as { [K in T]: string };
  }

  createUserRootFiles<T extends string>(files: T[]): { [K in T]: string } {
    const defaultFiles = files.map((file) => {
      const defaultContent = JSON.stringify({
        [file]: {},
        lastModifiedAt: this.lastLocalModifiedAt,
      });
      return {
        [file]: hasLocalFile([this.userInfo.userId, file])
          ? path.join(this.userPath, file)
          : createLocalFile(this.userPath, file, defaultContent),
      };
    });

    return { ...defaultFiles } as { [K in T]: string };
  }

  setLastEditTime(filePath: string) {
    if (path.extname(filePath) !== ".json") {
      console.error("Error: This script only supports JSON files.");
      return;
    }

    try {
      const currentTime = new Date().toISOString(); // ISO 포맷으로 현재 시간 설정
      // JSON 파일 읽기 (동기)
      const data = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.parse(data);

      // 마지막 수정 시간 추가
      jsonData.lastModified = currentTime;
      this.lastLocalModifiedAt = currentTime;
      // JSON 파일 다시 쓰기 (동기)
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
      console.log(`Successfully added lastModified time to ${filePath}`);

      return currentTime;
    } catch (err) {
      console.error(`Error processing file: ${err.message}`);
    }
  }

  readRootFiles() {
    try {
      // 경로에 있는 모든 파일을 읽기
      const files = fs.readdirSync(this.userPath);

      // .json 확장자를 가진 파일만 필터링
      const jsonFiles = files.filter((file) => path.extname(file) === ".json");

      // 필터링된 JSON 파일들을 defaultFiles에 추가
      this.defaultFiles = [...jsonFiles];
      if (!this.defaultFiles.includes["memos.json"]) {
        this.defaultFiles.push("memos.json");
      }
    } catch (err) {
      console.error(
        `Error reading files from ${this.userPath}: ${err.message}`
      );
    }
    return this.defaultFiles;
  }

  initRootFiles() {
    this.readRootFiles();
    this.defaultFilesPath = this.createUserRootFiles(this.defaultFiles);
    // this.defaultFiles.forEach((file) =>
    //   this.setLastEditTime(this.defaultFilesPath[file])
    // );
  }
}

export const store = new Store();
