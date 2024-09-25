import TinyMCEExample from "@components/writePage/TinyMCEEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "shareduck-ui";
import styled from "styled-components";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  tag: z.array(z.string()),
  value: z.string(),
});
const CreatePage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    // try {
    //   await loginService.doLogin(data.email, data.password);
    //   const accountModel = await accountService.getAccount();
    //   setAccountName(accountModel.accountName);
    //   navigate(`${import.meta.env.BASE_URL}tm`);
    // } catch (e) {
    //   console.error("Login or ship ID retrieval failed:", e);
    // }
  });

  return (
    <Wrapper>
      <BackButton>
        <img src="/src/assets/backArrowIcon.svg" alt="" />
        <p>게시글 목록</p>
      </BackButton>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <FormHeader>
          <FormItem>
            <label htmlFor="title">제목</label>
            <Input id="title" placeholder="제목을 입력해주세요." />
          </FormItem>
          <FormItem>
            <label htmlFor="tag">태그</label>
            <Input id="tag" placeholder="태그를 입력해주세요." />
          </FormItem>
          <FormItem>
            <label htmlFor="value">값</label>
            <Input id="value" placeholder="값을 입력해주세요." />
          </FormItem>
        </FormHeader>

        {/* <EditorJSComp initialData={data} onChange={handleEditorChange} /> */}
        <TinyMCEExample />

        {/* <Button onClick={handleClick}>
          <Button.Icon src={"plus"} alt={"plus"} />
          <Button.Text>New Category</Button.Text>
        </Button> */}
      </Form>
    </Wrapper>
  );
};

export default CreatePage;

const Wrapper = styled.div`
  width: 100%;
  background: #f1f2f4;
  padding: 64px 36px;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 24px;
  cursor: pointer;
  border-radius: 8px;
  width: fit-content;
  padding: 4px 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  & > p {
    font-size: 24px;
    color: #000;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: -0.456px;
    padding-top: 3px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > * {
    border-radius: 8px;
    border: 1px solid #efe9f1;
    background: #fff;
  }
`;

const FormHeader = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
  align-self: stretch;
`;

const FormItem = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 6px 8px;
  width: 100%;

  & > label {
    width: 38px;
    font-size: 14px;
    line-height: 140%;
  }

  & > input {
    width: 100%;
  }

  // & > :first-child {
  //   flex-shrink: 0;
  // }
`;
