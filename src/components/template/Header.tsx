import { MouseEventHandler, useEffect, useState } from "react";
import { TitlebarIcons } from "shareduck-ui";
import styled from "styled-components";

export default function Header() {
  const [size, setSize] = useState(true); //min

  const handleClickSize: MouseEventHandler = (_e) => {
    if (size) window.shareDuck.send("title-bar-action", "MAX");
    else window.shareDuck.send("title-bar-action", "MAX");
    setSize(!size);
  };
  const handleClickDown: MouseEventHandler = (_e) => {
    window.shareDuck.send("title-bar-action", "CLOSE_MIN");
  };
  const handleClickClose: MouseEventHandler = (_e) => {
    window.shareDuck.send("title-bar-action", "CLOSE");
  };
  return (
    <>
      <StyledHeader onDoubleClick={(e) => e.preventDefault()}>
        <StyledDrag onDoubleClick={(e) => e.preventDefault()}></StyledDrag>
        <TitlebarIcons os="WIN">
          <TitlebarIcons.Down onClick={handleClickDown} />
          <TitlebarIcons.Size onClick={handleClickSize} />
          <TitlebarIcons.Close onClick={handleClickClose} />
        </TitlebarIcons>
      </StyledHeader>
      <div style={{ height: "32px", width: "100vw" }}></div>
    </>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  height: 32px;
  width: calc(100% - 2px); /*Compensate for body 1px border*/
  border-bottom: 1px solid var(--wb-100, #efe9f1);
  background: var(--wb-000, #fff);
  z-index: 9999;

  display: flex;
  height: 32px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const StyledDrag = styled.div`
  width: 100%;
  height: 100%;

  -webkit-app-region: drag;
  -webkit-user-select: none;
  user-select: none;
  /* Allow user to drag the window using this titlebar */
`;
