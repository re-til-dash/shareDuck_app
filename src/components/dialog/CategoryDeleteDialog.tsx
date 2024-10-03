import {
  DialogHTMLAttributes,
  Dispatch,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import Dialog from "./Dialog";
import useDialog from "@hooks/useDialog";
import { TypeReducerParams } from "@components/template/Sidebar";
import { TypeCategory } from "@/types/category";
import styled from "styled-components";
import { Button } from "shareduck-ui";

export interface TypeCategoryDialogProps
  extends DialogHTMLAttributes<HTMLDialogElement> {
  category: TypeCategory;
  openTrigger: HTMLElement;
  setCategories: Dispatch<TypeReducerParams> | null;
}

export default function CategoryDeleteDialog({
  openTrigger,
  category,
  setCategories,
}: TypeCategoryDialogProps) {
  const { openDialog, setOpenDialog } = useDialog(openTrigger);

  useEffect(() => {}, []);
  const handleClickDelete: MouseEventHandler = (_e) => {
    if (setCategories) setCategories({ action: "DELETE", value: category });
    setOpenDialog(false);
  };
  return (
    <Dialog
      style={{ width: "30vw" }}
      open={openDialog}
      setOpenDialog={setOpenDialog}
    >
      <h3>카테고리를 정말 삭제하시겠습니까?</h3>
      <StyledContainer>
        <Button
          type="button"
          onClick={(e) => {
            setOpenDialog(false);
          }}
        >
          취소하기
        </Button>
        <Button onClick={handleClickDelete}>삭제하기</Button>
      </StyledContainer>
    </Dialog>
  );
}

const StyledContainer = styled.div`
  display: flex;
  width: fit-content;
  margin-left: auto;
  gap: 8px;
  color: var(--wb-000);
  padding: 30px;
`;
