import App from "../App";
import { createHashRouter, RouteObject } from "react-router-dom";

const routers: RouteObject[] = [{ path: "", element: <App /> }];

const router = createHashRouter(routers);

export default router;
