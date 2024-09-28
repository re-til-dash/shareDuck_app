import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
function Layout() {
  return (
    <StyledMain>
      <Sidebar />
      <div style={{ width: "80px" }}></div>
      <Outlet />
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
