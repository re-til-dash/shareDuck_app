export interface UserId {
  userId: number;
}

export interface User extends UserId {
  email: string;
  nickname: string;
  profile: string;
  role: "USER" | undefined;
  phone: string;
  created: string;
  updated: string;
  provider: "JWT" | "GOOGLE";
  idx: string;
  state: "ACTIVE" | "SLEEP" | "DELETE";
  lastConnect: string;
}
