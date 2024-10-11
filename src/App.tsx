import Layout from "@components/template/Layout";
import { useEffect } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router";

function App() {
  //TODO: users api 완료 후 loaderData로 교체하기 ~ Login 컴포넌트
  // const isCorrectUser = useLoaderData();
  const navigate = useNavigate();
  const isCorrectUser = useLocation().state;

  useEffect(() => {
    if (!isCorrectUser) {
      navigate("/login");
    }
  }, [isCorrectUser]);
  return <Layout />;
}

export default App;
