import { DialogHTMLAttributes, Dispatch, SetStateAction } from "react";
import { TitlebarIcons } from "shareduck-ui";
import styled, { css } from "styled-components";

export interface TypeDialogProps
  extends DialogHTMLAttributes<HTMLDialogElement> {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

export interface TypeDialogTitlebarProps {
  os: "WIN" | "MAC";
  setCloseDialog: Dispatch<SetStateAction<boolean>>;
}

function DialogTitlebar({ os, setCloseDialog }: TypeDialogTitlebarProps) {
  return (
    <>
      <TitlebarIcons os={os}>
        <TitlebarIcons.Close
          style={{ margin: "8px", marginLeft: "auto", marginRight: "16px" }}
          onClick={(e) => setCloseDialog(false)}
        />
      </TitlebarIcons>
      <hr />
    </>
  );
}
Dialog.Titlebar = DialogTitlebar;

export default function Dialog({
  open = false,
  setOpenDialog,
  children,
  ...props
}: TypeDialogProps) {
  return (
    <StyledDialog {...props} open={open}>
      <DialogTitlebar os="WIN" setCloseDialog={setOpenDialog} />
      <StyledMain>{children}</StyledMain>
    </StyledDialog>
  );
}

const CSSTextSetting = css`
  color: var(--wb-900, #141314);

  /* typo/typo-head-24-bold */
  font-family: SUIT;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.456px;
`;

const CSSTextCategroy = css`
  color: var(--wb-900, #141314);

  /* typo/typo-body-18 */
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.27px;
`;

const StyledDialog = styled.dialog`
  position: fixed;
  z-index: 999;
  width: 50vw;
  min-width: fit-content;
  height: fit-content;
  inset: 0;
  margin: auto;

  border-radius: 8px;
  border: 1px solid var(--wb-900, #141314);
  background: var(--wb-000, #fff);

  & h2 {
    ${CSSTextSetting}
    margin-bottom: 20px;
  }

  & h3 {
    ${CSSTextCategroy}
  }
`;

const StyledMain = styled.main`
  padding: 20px;
`;
