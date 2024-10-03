import { fileURLToPath } from "node:url";
import path from "node:path";

export const WINDOW_DEFAULT_SIZE = { width: 1200, height: 800 };
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
export const VITE_MEMO_SERVER_URL =
  process.env.VITE_DEV_SERVER_URL + "/memo.html";

export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;
