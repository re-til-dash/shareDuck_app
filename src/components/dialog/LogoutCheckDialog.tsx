import { DialogHTMLAttributes, MouseEventHandler } from "react";
import Dialog from "./Dialog";
import useDialog from "@hooks/useDialog";
import { Button } from "shareduck-ui";
import { useNavigate } from "react-router";

export interface TypeLogoutDialogProps
  extends DialogHTMLAttributes<HTMLDialogElement> {
  openTrigger: HTMLElement;
}

export default function LogoutCheckDialog({
  openTrigger,
}: TypeLogoutDialogProps) {
  const { openDialog, setOpenDialog } = useDialog(openTrigger);
  const navigate = useNavigate();

  const handleLogout: MouseEventHandler = async (_e) => {
    const result = await window.shareDuck.invoke("auth-delete-ipc");
    if (!result) {
      //TODO: 로그아웃 실패에 대한 예외처리
    }
    setOpenDialog(false);
    navigate("");
  };
  return (
    <Dialog open={openDialog} setOpenDialog={setOpenDialog}>
      <h2>로그아웃</h2>
      <p>로그아웃 하시겠습니까?</p>
      <Button onClick={() => setOpenDialog(false)}>취소하기</Button>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Dialog>
  );
}
