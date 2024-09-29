import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { IconButton, PlusIcon } from "shareduck-ui";
import { MouseEventHandler } from "react";
function Layout() {
  const handleClickMemoOpen: MouseEventHandler = (_e) => {
    window.shareDuck.send("memo-ipc", "open");
  };
  return (
    <StyledMain>
      <Sidebar />
      <div style={{ width: "212.7px" }}></div>
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
