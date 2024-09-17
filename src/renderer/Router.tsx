import App from "../App";
import { createHashRouter, RouteObject } from "react-router-dom";
import Home from "./Home";

const routers: RouteObject[] = [
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: null,
      },
    ],
  },
];

const router = createHashRouter(routers);

export default router;
