import { TypeReducerParams } from "@components/template/Sidebar";
import {
  DialogHTMLAttributes,
  Dispatch,
  FormEventHandler,
  useState,
} from "react";
import { Button, Input } from "shareduck-ui";
import styled from "styled-components";
import Dialog from "./Dialog";
import useDialog from "@hooks/useDialog";

//단일 카테고리 가져오는 API 나오는 대로 수정할 예정
export interface TypeCategoryDialogProps
  extends DialogHTMLAttributes<HTMLDialogElement> {
  categoryId: number;
  name: string;
  properties: {
    [key: string]: string;
  };
  openTrigger: HTMLElement;
  setCategories: Dispatch<TypeReducerParams> | null;
}

export default function CategorySettingDialog({
  categoryId,
  name,
  properties = {},
  openTrigger,
  setCategories,
}: TypeCategoryDialogProps) {
  const keys = Object.keys(properties);

  const [newName, setNewName] = useState(name);
  const [newPropertyName, setNewPropertyName] = useState("");
  const [newProperty, setNewProperty] = useState(properties);

  const { openDialog, setOpenDialog } = useDialog(openTrigger);

  const handleSubmitNew: FormEventHandler = (_e) => {
    _e.preventDefault();
    const newData = {
      name: newName,
      properties: newProperty && properties,
    };

    if (setCategories)
      setCategories({
        action: "UPDATE",
        value: { id: categoryId, ...newData },
      });
  };
  return (
    <Dialog open={openDialog} setOpenDialog={setOpenDialog}>
      <h2>설정</h2>
      <StyeldSection>
        <h3>카테고리</h3>
        <StyledForm onSubmit={handleSubmitNew}>
          <label>
            이름
            <Input
              placeholder="이름을 입력해주세요"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </label>
          {keys.map((key) => {
            return (
              <label key={key}>
                {key}
                <Input
                  placeholder="새로운 속성 이름을 입력해주세요."
                  type="text"
                  value={newPropertyName}
                  onChange={(e) => {
                    setNewPropertyName((_prev) => e.target.value);
                    setNewProperty((prev) => ({
                      ...prev,
                      [newPropertyName]: prev[key],
                    }));
                  }}
                />
              </label>
            );
          })}
          <StyledContainer>
            <Button
              type="button"
              onClick={(_e) => {
                setOpenDialog(false);
              }}
            >
              취소하기
            </Button>
            <Button type="submit">저장하기</Button>
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
