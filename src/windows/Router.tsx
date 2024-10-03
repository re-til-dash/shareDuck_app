import App from "../App";
import { createHashRouter, RouteObject } from "react-router-dom";
import Home from "@pages/Home";
import Error from "./Error";
import Category from "@pages/Category";
import Post from "@pages/Post";
import Overview from "@pages/Overview";
import CreatePage from "@pages/CreatePage";
import { DetailPage } from "@pages/DetailPage";

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
      { path: "/writepage", element: <CreatePage /> },
      { path: "/:postId/detailpage", element: <DetailPage /> },
      {
        path: "/:menu",
        element: <Category />,
        children: [
          {
            path: "/:menu/post",
            element: <Post />,
            // children: [{ path: "/:id", element: null }],
          },
          {
            path: "/:menu/overview",
            element: <Overview />,
          },
        ],
      },
    ],
  },
];

const router = createHashRouter(routers);

export default router;
