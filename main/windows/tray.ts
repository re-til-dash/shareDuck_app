import { app, Tray, Menu, nativeImage } from "electron";
import path from "node:path";
import { __dirname, RENDERER_DIST } from "../config/window.config";

let tray: Tray | null = null;

// 트레이 아이콘 생성
export default function createTray(window) {
  //TODO: 사용자 os 환경에 따라서 이미지 확장자 달라짐! Mac -> icns / win -> ico(png 가능하긴함) / linux -> png
  const iconPath = path.join(RENDERER_DIST, "favicon-16x16.png");

  const nativeIcon = nativeImage.createFromPath(iconPath);
  if (nativeIcon.isEmpty()) {
    console.error("Failed to load tray icon. Check the file path or format.");
  }

  tray = new Tray(nativeIcon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        if (window) {
          window.show(); // 창을 표시
        }
      },
    },
    {
      label: "Quit",
      click: () => {
        if (process.platform !== "darwin") {
          app.removeAllListeners();
          app.quit();
        }
      },
    },
  ]);
  tray.setToolTip("shareDuck");
  tray.setContextMenu(contextMenu);

  // 트레이 아이콘 클릭 시 창 표시
  tray.on("click", () => {
    if (window) {
      window.show();
    }
  });
}
