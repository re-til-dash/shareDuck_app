import { UserId } from "./user";

export interface TypeCategory extends UserId {
  id: number;
  name: string;
  properties: object;
}
