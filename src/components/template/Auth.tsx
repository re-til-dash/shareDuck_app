import { FormEventHandler, ReactNode } from "react";
import styled from "styled-components";

export interface TypeAuthProps {
  children: ReactNode;
  submitHandler: FormEventHandler;
}

export default function Auth({ children, submitHandler }: TypeAuthProps) {
  return (
    <StyeldSection>
      <StyledForm onSubmit={submitHandler}>{children}</StyledForm>
    </StyeldSection>
  );
}

const StyeldSection = styled.section`
  width: fit-content;
  min-width: 400px;
  height: fit-content;
  margin: auto;
  padding-top: 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > hgroup {
    text-align: center;
    margin: 36px;
  }

  & input {
    /* width를 100%로 주게되면 가로 스크롤이 생김 */
    width: 400px;
  }

  & input[type="checkbox"] {
    height: fit-content;
  }

  & > label {
    margin-bottom: 20px;
  }
  & > button {
    margin-bottom: 8px;
  }
  & > button > span {
    margin: auto;
  }

  & > a {
    color: var(--wb-500);
  }

  & div {
    display: flex;
    margin: 30px 0px;
    color: var(--wb-700);
    & > * {
      flex-shrink: 0;
      margin: 0px 8px;
    }

    & > hr {
      flex-shrink: 1;
      width: 100%;
      margin: auto;
    }
  }

  & > span {
    margin-top: 24px;

    color: var(--wb-500);

    & > a {
      text-decoration: none;
      color: var(--wb-900);
    }
  }
`;
