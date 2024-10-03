import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: "main/main.ts",
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, "main/preload.ts"),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
  build: {
    outDir: "dist", // 빌드된 렌더러 파일을 shareDuck/dist 디렉토리에 저장
    assetsDir: "resources", // 리소스 파일을 저장할 디렉토리 설정
    sourcemap: true, // 소스맵 생성 (디버깅에 유용)
    chunkSizeWarningLimit: 1000, // 경고를 무시하기 위해 청크 크기 한도 1000kb로 상향
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        memo: path.resolve(__dirname, "memo.html"), // memo.html을 엔트리로 추가
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: `resources/[name].[ext]`, // 폰트 파일을 포함한 모든 파일을 assets 폴더로 이동
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // node_modules 폴더를 기준으로 청크 분할
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, // 콘솔 로그 제거
        drop_debugger: true, // 디버거 제거
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
      {
        find: "@/types",
        replacement: path.resolve(__dirname, "./src/types"),
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "./src/styles"),
      },
      {
        find: "@windows",
        replacement: path.resolve(__dirname, "./src/windows"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "./src/pages"),
      },
      {
        find: "@main",
        replacement: path.resolve(__dirname, "./main"),
      },

      {
        find: "@config",
        replacement: path.resolve(__dirname, "./main/config"),
      },
      {
        find: "@api",
        replacement: path.resolve(__dirname, "./main/api"),
      },
    ],
  },
});
