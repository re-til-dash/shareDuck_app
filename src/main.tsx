import React from "react";
import ReactDom from "react-dom/client";
import Router from "@service/Router";
import { RouterProvider } from "react-router-dom";
import "@styles/global.css";

ReactDom.createRoot(document.getElementById("root") as HTMLElement)!.render(
  <React.StrictMode>
    <React.Suspense fallback={<>로딩중...</>}>
      <RouterProvider router={Router} />
    </React.Suspense>
  </React.StrictMode>
);
// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
