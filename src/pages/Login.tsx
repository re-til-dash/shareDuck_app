import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChangeEventHandler, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Button,
  CheckBox,
  CryingEmoji,
  Input,
  LogOutIcon,
  Toast,
} from "shareduck-ui";
import styled from "styled-components";
import Auth from "@components/template/Auth";

const initValue = { email: "", password: "" };
const schema = z.object({
  email: z.string().email("이메일을 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof initValue>({
    resolver: zodResolver(schema),
    defaultValues: initValue,
  });

  const [showWarn, setShowWarn] = useState(false);

  const handleSubmitLogin = handleSubmit(async (data) => {
    console.log(data);
    const result = await window.shareDuck.invoke("auth-post-ipc", data);
    setShowWarn(!result);
  });
  //TODO: api 연동 필요
  const handleCheckAutoLogin: ChangeEventHandler = (_e) => {};
  return (
    <Auth submitHandler={handleSubmitLogin}>
      <h1>로그인</h1>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <label>
            <Input type="email" placeholder="이메일" {...field} />
          </label>
        )}
      />
      {errors.email && (
        <Toast variants="error">
          <Toast.Emoji src={CryingEmoji} />
          <Toast.Text content="사용할 수 없는 이메일입니다" />
        </Toast>
      )}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <label>
            <Input type="password" placeholder="비밀번호" {...field} />
          </label>
        )}
      />
      {errors.password && (
        <Toast variants="error">
          <Toast.Emoji src={CryingEmoji} />
          <Toast.Text content="사용할 수 없는 비밀번호입니다" />
        </Toast>
      )}
      {showWarn && (
        <label>
          <Toast variants="error">
            <Toast.Emoji src={CryingEmoji} />
            <Toast.Text content="이메일 혹은 비밀번호를 확인해주세요!" />
          </Toast>
        </label>
      )}

      <label>
        <CheckBox label="자동 로그인" onChange={handleCheckAutoLogin} />
      </label>
      <Button type="submit">
        <Button.Text>로그인</Button.Text>
      </Button>
      <StyledLink to={"/signup"}>
        <Button>
          <Button.Text>회원가입</Button.Text>
        </Button>
      </StyledLink>
      <Link to={"/ "}>비밀번호 재설정</Link>
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
      <p>
        구글 로그인 시 <Link to={"/info"}>개인정보이용</Link>과{" "}
        <Link to={"/info"}>서비스이용</Link> 약관에 동의합니다.
      </p>
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
