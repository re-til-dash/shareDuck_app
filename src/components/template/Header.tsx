import { MouseEventHandler, useEffect, useState } from "react";
import { Button, Icon } from "shareduck-ui";
import styled from "styled-components";

import CloseIcon from "@assets/titlebar-close.svg";
import MinIcon from "@assets/titlebar-min.svg";
import SizeIcon from "@assets/titlebar-size.svg";

export default function Header() {
  const [size, setSize] = useState(true); //min
  useEffect(() => {
    if (size) window.shareDuck.send("title-bar-action", "MAX");
    else window.shareDuck.send("title-bar-action", "MAX");
  }, [size]);
  const handleClickMax: MouseEventHandler = (_e) => {
    setSize(!size);
  };
  const handleClickRestore: MouseEventHandler = (_e) => {
    window.shareDuck.send("title-bar-action", "CLOSE_MIN");
  };
  const handleClickClose: MouseEventHandler = (_e) => {
    window.shareDuck.send("title-bar-action", "CLOSE");
  };
  return (
    <StyledHeader onDoubleClick={(e) => e.preventDefault()}>
      <StyledDrag onDoubleClick={(e) => e.preventDefault()}></StyledDrag>
      <StyledButtons>
        <Button onClick={handleClickRestore}>
          <img src={MinIcon} alt="minimize" />
        </Button>
        <Button onClick={handleClickMax}>
          <img src={SizeIcon} alt="size" />
        </Button>
        <Button onClick={handleClickClose}>
          <img src={CloseIcon} alt="close" />
        </Button>
      </StyledButtons>
    </StyledHeader>
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

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 16px;
  width: fit-content;

  & > button {
    min-width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--wb-100, #efe9f1);
    padding: 5px;
  }
`;
