import {
  createPost,
  TypeRequestPostCategory,
  uploadImg,
} from "../apis/posts/createPost";
import TinyMCEExample from "@components/writePage/TinyMCEEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { processAndUploadPost } from "@utils/img";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "shareduck-ui";
import styled from "styled-components";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  hashtags: z.string().min(1, "태그를 입력해주세요."),
  // value: z.string().min(1, "값을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
});

type FormData = z.infer<typeof schema>;

const CreatePage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      hashtags: "",
      // value: "",
      content: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const postId = 1;
    const content = await processAndUploadPost(data.content, postId);

    const request: TypeRequestPostCategory = {
      categoryId: 1,
      ...data,
      hashtags: data.hashtags.split(", "),
      content,
    };

    console.log("request: ", request);

    // TODO: content가 string 형태로 바뀌어야 함
    // try {
    //   const res = await createPost(request);

    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  });

  return (
    <Wrapper>
      <BackButton>
        <img src="/src/assets/backArrowIcon.svg" alt="" />
        <p>게시글 목록</p>
      </BackButton>

      <Form noValidate onSubmit={onSubmit}>
        <FormHeader>
          <FormItem>
            <label htmlFor="title">제목</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="제목을 입력해주세요."
                  {...field}
                />
              )}
            />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </FormItem>
          <FormItem>
            <label htmlFor="hashtags">태그</label>
            <Controller
              name="hashtags"
              control={control}
              render={({ field }) => (
                <Input
                  id="hashtags"
                  placeholder="태그를 입력해주세요."
                  {...field}
                />
              )}
            />
            {errors.hashtags && (
              <ErrorMessage>{errors.hashtags.message}</ErrorMessage>
            )}
          </FormItem>
          {/* <FormItem>
            <label htmlFor="value">값</label>
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <Input id="value" placeholder="값을 입력해주세요." {...field} />
              )}
            />
            {errors.value && (
              <ErrorMessage>{errors.value.message}</ErrorMessage>
            )}
          </FormItem> */}
        </FormHeader>

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TinyMCEExample value={field.value} setValue={setValue} />
          )}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}

        <SubmitButton type="submit">저장</SubmitButton>
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

  & > .tox-edit-area {
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
  width: 100%;
  padding: 6px 8px;
  align-items: center;

  & > label {
    font-size: 14px;
    line-height: 140%;
    margin-bottom: 4px;
    width: 40px;
  }

  & > input {
    width: 100%;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
