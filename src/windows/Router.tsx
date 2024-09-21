import App from "../App";
import { createHashRouter, RouteObject } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";

//todo: 서버에서 가져온 정보로 동적 라우터 생성하기
//todo: private 라우터 설정하기

const routers: RouteObject[] = [
  {
    path: "",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: null,
      },
      { path: "/home", element: <Home /> },
    ],
  },
];

const router = createHashRouter(routers);

export default router;
