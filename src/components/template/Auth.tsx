import { FormEventHandler, ReactNode } from "react";
import styled from "styled-components";
import { z } from "zod";

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
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > h1 {
    text-align: center;
    margin: 36px;
  }

  & input {
    width: 100%;
  }

  & input[type="checkbox"] {
    height: fit-content;
  }

  & > label {
    margin-bottom: 24px;
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

  & p {
    margin-top: 24px;

    color: var(--wb-500);

    & > a {
      text-decoration: none;
      color: var(--wb-900);
    }
  }
`;
