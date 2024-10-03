import Auth from "@components/template/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, CryingEmoji, Input, LogOutIcon, Toast } from "shareduck-ui";
import styled from "styled-components";
import { z } from "zod";

const initValue = { email: "", password: "", name: "", passwordCheck: "" };

// 비밀번호 정규식: 8자 이상, 알파벳(대소문자 상관없음), 숫자, 특수 문자 포함
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/;

const schema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요"),
    email: z.string().email("올바른 이메일 형식을 입력해주세요"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(
        passwordRegex,
        "비밀번호는 알파벳, 숫자, 특수문자를 포함해야 합니다."
      ),
    passwordCheck: z.string().min(8, "비밀번호를 한번 더 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordCheck"], // passwordCheck 필드에 에러 메시지 표시
  });

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof initValue>({
    resolver: zodResolver(schema),
    defaultValues: initValue,
    mode: "onChange", // 실시간으로 입력값 변경 시 유효성 검사
    reValidateMode: "onChange", // 입력이 변경될 때마다 재검증 수행
  });
  // 에러 메시지를 관리하는 배열
  const errorMessages = [
    {
      field: "name",
      message: errors.name?.message || "이름을 정확히 입력해주세요",
    },
    {
      field: "email",
      message: errors.email?.message || "사용할 수 없는 이메일입니다",
    },
    {
      field: "password",
      message: errors.password?.message || "사용할 수 없는 비밀번호입니다",
    },
    {
      field: "passwordCheck",
      message: errors.passwordCheck?.message || "비밀번호가 일치하지 않습니다",
    },
  ];
  const [showWarn, setShowWarn] = useState(false);

  const handleSubmitSignup = handleSubmit(async (data) => {
    console.log(data);
    const result = await window.shareDuck.invoke("user-post-ipc", data);
    setShowWarn(!result);
  });
  return (
    <Auth submitHandler={handleSubmitSignup}>
      <h1>회원가입</h1>
      {/* 각 필드를 Controller로 관리 */}
      {["name", "email", "password", "passwordCheck"].map((field, idx) => (
        <>
          <Controller
            key={field}
            name={field as keyof typeof initValue}
            control={control}
            render={({ field }) => (
              <label>
                <Input
                  type={field.name.includes("password") ? "password" : "text"}
                  placeholder={field.name}
                  {...field}
                />
              </label>
            )}
          />
          {errors[field as keyof typeof initValue] && (
            <label>
              <Toast key={field} variants="error">
                <Toast.Emoji src={CryingEmoji} />
                <Toast.Text content={errorMessages[idx].message} />
              </Toast>
            </label>
          )}
        </>
      ))}

      {showWarn && (
        <label>
          <Toast variants="error">
            <Toast.Emoji src={CryingEmoji} />
            <Toast.Text content="사용할 수 없는 이메일입니다" />
          </Toast>
        </label>
      )}

      <Button type="submit">
        <Button.Text>회원가입</Button.Text>
      </Button>
      <StyledLink to={"/login"}>
        <Button>
          <Button.Text>로그인 바로가기</Button.Text>
        </Button>
      </StyledLink>
      <div>
        <hr />
        <span>or continue with</span>
        <hr />
      </div>
      <Button
        style={{
          backgroundColor: "var(--wb-000)",
          border: "1px solid var(--wb-300)",
          borderRadius: "9999px",
          width: "100%",
        }}
      >
        <Button.Icon src={LogOutIcon} alt="google로 로그인하기" />
        <Button.Text style={{ color: "var(--wb-900)", margin: "auto" }}>
          Google
        </Button.Text>
      </Button>
      <div>
        구글 로그인 시 <Link to={"/info"}>개인정보이용</Link>과{" "}
        <Link to={"/info"}>서비스이용</Link> 약관에 동의합니다.
      </div>
    </Auth>
  );
}

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  margin-bottom: 8px;

  & > button {
    width: 100%;
    background-color: var(--wb-000);
    border: 1px solid var(--vio-400);

    & > span {
      color: var(--vio-400);
      margin: auto;
    }
  }
`;
