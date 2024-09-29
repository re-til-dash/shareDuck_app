import { GlobalStyle, LightTheme, TitlebarIcons } from "shareduck-ui";
import styled, { ThemeProvider } from "styled-components";

export default function Memo() {
  return (
    <>
      <StyledHeader onDoubleClick={(e) => e.preventDefault()}>
        <StyledDrag onDoubleClick={(e) => e.preventDefault()}>
          <h1>메모</h1>
        </StyledDrag>

        <TitlebarIcons os="WIN">
          <TitlebarIcons.Close />
        </TitlebarIcons>
      </StyledHeader>
      <div style={{ height: "60px", width: "100vw" }}></div>
    </>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  height: 60px;
  width: calc(100% - 2px); /*Compensate for body 1px border*/
  background: var(--wb-000, #fff);
  z-index: 9999;
  border-bottom: 1px solid var(--wb-300);

  display: flex;
  height: 32px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  & h1 {
    color: var(--wb-900, #141314);

    /* typo/typo-head-24-bold */
    font-family: SUIT;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; /* 133.333% */
    letter-spacing: -0.456px;
  }
`;

const StyledDrag = styled.div`
  width: 100%;
  height: 100%;

  -webkit-app-region: drag;
  -webkit-user-select: none;
  user-select: none;
  /* Allow user to drag the window using this titlebar */

  text-align: center;
`;
