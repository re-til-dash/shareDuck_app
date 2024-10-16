import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { IconButton, PlusIcon } from "shareduck-ui";
import { MouseEventHandler, useEffect } from "react";
function Layout() {
  const { menu } = useParams();

  useEffect(() => {
    //todo: 카테고리 id로 현재 카테고리에 대한 정보 가져오는 api 호출 필요
    window.shareDuck.send("route-ipc", "current", { category: menu, id: menu });
  }, [menu]);

  const handleClickMemoOpen: MouseEventHandler = (_e) => {
    //CategoryId가 없는 경우 -> 전체 메모 불러오기로 변경
    window.shareDuck.send("memo-ipc", "open", {
      categoryId: menu,
      keyword: "",
      page: 0,
      size: 1,
    });
  };
  return (
    <StyledMain>
      <Sidebar />{" "}
      <IconButton.Primary
        style={{
          position: "fixed",
          inset: 0,
          margin: "auto",
          marginBottom: "16px",
          marginRight: "16px",
          width: "60px",
          height: "60px",
        }}
        src={PlusIcon}
        alt="open memo"
        onClick={handleClickMemoOpen}
      />
      <div style={{ minWidth: "212.7px" }}></div>
      <Outlet />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  height: 100vh;
  width: 100vw;
  /* 여백상쇄가 일어나지 않아서  margin이 아닌 padding 사용 */
  padding-top: 32px;

  & > :first-child {
    flex-shrink: 0;
  }

  background-color: #f9fafb;
`;

export default Layout;
