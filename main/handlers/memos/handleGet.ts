import getMemo from "../../api/memos/getMemo";

export default async function handleGetMemo() {
  const result = await getMemo();

  return result;
}
