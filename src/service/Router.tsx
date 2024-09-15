import App from "../App";
import { createHashRouter, RouteObject } from "react-router-dom";

const router: RouteObject[] = [{ path: "", element: <App /> }];

const Router = createHashRouter(router);

export default Router;
