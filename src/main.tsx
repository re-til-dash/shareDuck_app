import ReactDom from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./windows/Router";

ReactDom.createRoot(document.getElementById("root") as HTMLElement)!.render(
  <RouterProvider router={router} />
);
