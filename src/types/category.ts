import { UserId } from "./user";

export interface typeCategory extends UserId {
  id: number;
  name: string;
  properties: object;
}
