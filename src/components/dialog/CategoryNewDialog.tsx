import {
  DialogHTMLAttributes,
  Dispatch,
  FormEventHandler,
  useState,
} from "react";
import { Button, Input } from "shareduck-ui";
import Dialog from "./Dialog";
import { TypeReducerParams } from "@components/template/Sidebar";
import useDialog from "@hooks/useDialog";
import { TypeCategory } from "@/types/category";
import styled from "styled-components";

export interface TypeCategoryNewDialogProps
  extends DialogHTMLAttributes<HTMLDialogElement> {
  openTrigger: HTMLElement;
  setCategories: Dispatch<TypeReducerParams> | null;
}

export default function CategoryNewDialog({
  openTrigger,
  setCategories,
}: TypeCategoryNewDialogProps) {
  const { openDialog, setOpenDialog } = useDialog(openTrigger);

  const [newProperties, setNewProperties] = useState("");

  const [newCategory, setNewCategory] = useState<Partial<TypeCategory>>({
    name: "",
    properties: {},
  });

  const handleSubmitNew: FormEventHandler = (e) => {
    e.preventDefault();
    //todo: 백엔드에 req 형식 변경 요청하기
    /** as-is : {
      "name": "string",
      "properties": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      }
    }
    to-be: {
      "name" : "string", "properties" : "key1, key2, key43"
    }
    */
    if (newProperties) {
      const dict: { [key: string]: {} } = {};

      newProperties.split(",").forEach((pro) => {
        if (pro) dict[pro] = {};
      });

      setNewCategory((prev) => ({ ...prev, properties: dict }));
    }
    if (setCategories && newCategory.name)
      setCategories({ action: "CREATE", value: newCategory });

    setOpenDialog(false);
  };
  return (
    <Dialog open={openDialog} setOpenDialog={setOpenDialog}>
      <h2>새로운 카테고리</h2>
      <StyeldSection>
        <h3>카테고리</h3>
        <StyledForm onSubmit={handleSubmitNew}>
          <label>
            이름
            <Input
              type="text"
              value={newCategory?.name}
              onChange={(e) =>
                setNewCategory((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </label>
          <label>
            속성: ","로 구분하여 여러가지 속성 추가하기
            <Input
              type="text"
              value={newProperties}
              onChange={(e) => setNewProperties(e.target.value)}
            />
          </label>
          <StyledContainer>
            <Button
              onClick={() => {
                setOpenDialog(false);
              }}
              type="reset"
            >
              취소하기
            </Button>
            <Button type="submit">생성하기</Button>
          </StyledContainer>
        </StyledForm>
      </StyeldSection>
    </Dialog>
  );
}

const StyeldSection = styled.section`
  display: flex;
  gap: 16px;

  & > :first-child {
    flex-shrink: 0;
  }
`;
const StyledForm = styled.form`
  width: 100%;
  & > label > input {
    display: block;
    margin-top: 10px;
    margin-bottom: 16px;
    width: 80%;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  color: var(--wb-000);

  & > button:first-child {
    margin-left: auto;
  }
`;
