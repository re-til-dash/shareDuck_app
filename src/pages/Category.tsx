import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
export default function Categroy() {
  //useLocation을 사용할 때 한글이 깨지는 현상이 있습니다.
  //한글이 깨질 때는 디코딩하여 사용.
  // const decodedMenu = menu ? decodeURIComponent(menu) : "";
  const { menu } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${menu}/overview`);
  }, [menu]);

  return <Outlet />;
}
