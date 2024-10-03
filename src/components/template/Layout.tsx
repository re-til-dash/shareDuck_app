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
    //! CategoryId가 없는 경우 일단 home으로 넣음. 이에 대한 예외처리 필요
    window.shareDuck.send("memo-ipc", "open", {
      categoryId: menu ?? "home",
      keyword: "",
      page: 0,
      size: 1,
    });
  };
  return (
    <StyledMain>
      <Sidebar />
      <div style={{ minWidth: "212.7px" }}></div>
      <Outlet />
      {/* 임시 아이콘 */}
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
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;

  & > :first-child {
    flex-shrink: 0;
  }
`;

export default Layout;
