import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
function Layout() {
  return (
    <StyledMain>
      <Sidebar />
      <Outlet />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;

  & > :first-child {
    flex-basis: 30%;
  }
`;

export default Layout;
