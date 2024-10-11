import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValid, z } from "zod";
import { Link } from "react-router-dom";
import Auth from "@components/template/Auth";
import {
  Button,
  CheckBox,
  CryingEmoji,
  Input,
  LogOutIcon,
  Toast,
} from "shareduck-ui";
import styled from "styled-components";

// FormValues 타입 정의
interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

interface CheckValues {
  privacy: boolean;
  service: boolean;
  marketing: boolean;
}

// 비밀번호 정규식: 알파벳, 숫자, 특수문자 포함, 8자 이상
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/;

// Zod 유효성 검사 스키마 정의
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
    path: ["passwordCheck"],
  });

// 체크박스 라벨 배열
const checkboxLabels = [
  "개인정보 이용 약관 동의",
  "서비스 이용 약관 동의",
  "마케팅 활용 약관 동의",
];

const checkValue = {
  privacy: false,
  service: false,
  marketing: false,
};

// 컴포넌트 정의
export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", passwordCheck: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    control: checkControl,
    formState: { isValid: isCheckValid },
  } = useForm<CheckValues>({
    defaultValues: checkValue,
    mode: "onChange",
  });

  const [showWarn, setShowWarn] = useState(false);
  const agreements = checkboxLabels.map(() => false);

  const [isAllagreed, setIsAllagreed] = useState(
    agreements.every((agree) => agree)
  );
  useEffect(() => {
    setIsAllagreed(isCheckValid && isValid);
  }, [isValid]);
  // 폼 제출 핸들러
  const onSubmit = async (data: FormValues) => {
    const newUser = {
      email: data.email,
      name: data.name,
      profile: "",
      password: data.password,
    };
    const result = await window.shareDuck.invoke("user-post-ipc", newUser);
    setShowWarn(!result);
  };

  return (
    <Auth submitHandler={handleSubmit(onSubmit)}>
      <hgroup>
        <h1>회원가입</h1>
        <StyledP>로그인을 위해 이메일과 비밀번호를 입력해주세요!</StyledP>
      </hgroup>

      {/* 각 필드를 배열을 이용해 간결하게 정의 */}
      {["name", "email", "password", "passwordCheck"].map((field) => (
        <div key={field}>
          <Controller
            name={field as keyof FormValues}
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
          {/* 필드별 에러 메시지 표시 */}
          {errors[field as keyof FormValues] && (
            <Toast variants="error">
              <Toast.Emoji src={CryingEmoji} />
              <Toast.Text
                content={
                  errors[field as keyof FormValues]?.message ??
                  "잠시 후 다시 시도해주세요"
                }
              />
            </Toast>
          )}
        </div>
      ))}

      {/* 서버 에러 메시지 표시 */}
      {showWarn && (
        <Toast variants="error">
          <Toast.Emoji src={CryingEmoji} />
          <Toast.Text content="이미 존재하는 계정입니다" />
        </Toast>
      )}

      {/* 개별 약관 동의 체크박스 */}
      {Object.keys(checkValue).map((label) => (
        <Controller
          name={label as keyof CheckValues}
          control={checkControl}
          render={({ field }) => (
            <CheckBox
              label={label}
              {...field}
              // onChange={field.onChange}
              value={field.value + ""}
              checked={field.value}
            />
          )}
        />
      ))}

      {/* 제출 버튼 */}
      <Button type="submit" disabled={!isAllagreed}>
        <Button.Text>회원가입</Button.Text>
      </Button>

      {/* 로그인 바로가기 버튼 */}
      <StyledLink to={"/login"}>
        <Button>
          <Button.Text>로그인 바로가기</Button.Text>
        </Button>
      </StyledLink>

      {/* 기타 로그인 방식 */}
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

// 스타일 정의
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

const StyledP = styled.p`
  margin-top: 4px;
  color: var(--wb-900, #141314);
  text-align: center;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.084px;
`;
