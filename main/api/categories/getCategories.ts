import api from "../../config/api.config.ts";

interface typeRespose {
  categories: Array<{
    id: number;
    name: string;
    properties: object;
  }>;
}

export default async function getCategories() {
  try {
    const data = await api.get("/categories");
    return data.data;
  } catch (error) {
    console.log("categories", error);
  }
  return null;
}
