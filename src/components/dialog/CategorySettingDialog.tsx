import { TypeReducerParams } from "@components/template/Sidebar";
import {
  DialogHTMLAttributes,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import { Button, Input, TitlebarIcons } from "shareduck-ui";
import styled, { css } from "styled-components";

//단일 카테고리 가져오는 API 나오는 대로 수정할 예정
export interface TypeCategoryData
  extends DialogHTMLAttributes<HTMLDialogElement> {
  categoryId: number;
  name: string;
  properties: {
    [key: string]: string;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
  setCategories: Dispatch<TypeReducerParams> | null;
}

export default function CategorySettingDialog({
  categoryId,
  name,
  properties = {},
  open,
  setOpen,
  setCategories,
}: TypeCategoryData) {
  const keys = Object.keys(properties);

  const [newName, setNewName] = useState(name);
  const [newPropertyName, setNewPropertyName] = useState("");
  const [newProperty, setNewProperty] = useState(properties);

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
    window.shareDuck
      .invoke("categories-patch-ipc", categoryId, JSON.stringify(newData))
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <StyledDialog open={open}>
      <TitlebarIcons os="WIN">
        <TitlebarIcons.Close
          style={{ margin: "8px", marginLeft: "auto", marginRight: "16px" }}
          onClick={(_e) => setOpen(false)}
        />
      </TitlebarIcons>
      <hr />
      <StyledMain>
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
              <Button type="button" onClick={(_e) => setOpen(false)}>
                취소하기
              </Button>
              <Button type="submit">저장하기</Button>
            </StyledContainer>
          </StyledForm>
        </StyeldSection>
      </StyledMain>
    </StyledDialog>
  );
}
const CSSTextSetting = css`
  color: var(--color-wb-900, #141314);

  /* typo/typo-head-24-bold */
  font-family: SUIT;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.456px;
`;

const CSSTextCategroy = css`
  color: var(--color-wb-900, #141314);

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
