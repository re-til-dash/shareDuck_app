import React, { useState } from "react";
import styled from "styled-components";

const SignIn = () => {
  // Form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    autoLogin: false,
  });

  // Handle input change
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: { target: { name: any; checked: any } }) => {
    const { name, checked } = e.target;
    setForm({
      ...form,
      [name]: checked,
    });
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log("Form submitted", form);
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <p>이메일과 비밀번호를 입력해주세요!</p>
        <StyledInput
          type="email"
          name="email"
          value={form.email}
          placeholder="이메일"
          onChange={handleInputChange}
          required
        />
        <StyledInput
          type="password"
          name="password"
          value={form.password}
          placeholder="비밀번호"
          onChange={handleInputChange}
          required
        />

        <StyledCheckbox>
          <input
            type="checkbox"
            name="autoLogin"
            checked={form.autoLogin}
            onChange={handleCheckboxChange}
          />
          <label>자동 로그인</label>
        </StyledCheckbox>

        <StyledButton type="submit">로그인</StyledButton>
        <StyledLoginLink>비밀번호 재설정</StyledLoginLink>

        <Divider>or continue with</Divider>

        <StyledGoogleButton>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
          />
          Google
        </StyledGoogleButton>
        <StyledNotice>
          구글 로그인 시 개인정보이용과 서비스이용 약관에 동의합니다.
        </StyledNotice>
      </StyledForm>
    </Container>
  );
};

// 중앙 정렬을 위한 Container
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면의 높이를 100%로 설정 */
  width: 100vw; /* 화면의 너비를 100%로 설정 */
  box-sizing: border-box;
`;

// Styled Components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;

  h1 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
    color: #666;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
`;

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }

  label {
    font-size: 0.9em;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #6a1b9a;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #4a148c;
  }
`;

const StyledLoginLink = styled.div`
  margin-top: 10px;
  color: #6a1b9a;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  font-size: 0.9em;
  color: #666;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ccc;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const StyledGoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: white;
  color: #444;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 10px;

  img {
    width: 20px;
    margin-right: 10px;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledNotice = styled.div`
  margin-top: 10px;
  font-size: 0.8em;
  color: #666;
  text-align: center;
`;

export default SignIn;
