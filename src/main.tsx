import "@styles/global.css";
import React from "react";
import ReactDom from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@service/Router";

ReactDom.createRoot(document.getElementById("root") as HTMLElement)!.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
