import App from "../App";
import { createHashRouter, RouteObject } from "react-router-dom";
import Home from "@pages/Home";
import Category from "@pages/Category";
import Post from "@pages/Post";
import Overview from "@pages/Overview";
import CreatePage from "@pages/CreatePage";
import SignUp from "@pages/SignUp";
import SignIn from "@pages/SignIn";
import { DetailPage } from "@pages/DetailPage";
import Login from "@pages/Login";
import Signup from "@pages/Signup";

//todo: 서버에서 가져온 정보로 동적 라우터 생성하기
//todo: private 라우터 설정하기
function loadUser() {
  const userInfo = window.shareDuck.invoke("user-get-ipc");
  return userInfo;
}
const routers: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <App />,
    loader: loadUser,
    children: [
      {
        index: true,

        errorElement: <Login />,
        element: <Home />,
      },

      //? 뒤에 page를 붙인 이유가 궁금합니다.
      { path: "/writepage", element: <CreatePage /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/signIn", element: <SignIn /> },
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
