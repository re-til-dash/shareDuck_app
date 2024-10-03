import { DialogHTMLAttributes, Dispatch } from "react";
import Dialog from "./Dialog";
import useDialog from "@hooks/useDialog";
import { Button } from "shareduck-ui";

export interface TypeLogoutDialogProps
  extends DialogHTMLAttributes<HTMLDialogElement> {
  openTrigger: HTMLElement;
}

export default function LogoutCheckDialog({
  openTrigger,
}: TypeLogoutDialogProps) {
  const { openDialog, setOpenDialog } = useDialog(openTrigger);
  return (
    <Dialog open={openDialog} setOpenDialog={setOpenDialog}>
      <h2>로그아웃</h2>
      <p>로그아웃 하시겠습니까?</p>
      <Button>취소하기</Button>
      <Button>로그아웃</Button>
    </Dialog>
  );
}
