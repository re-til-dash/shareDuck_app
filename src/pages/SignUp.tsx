import React, { useState } from "react";
import styled from "styled-components";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: {
      personalInfo: false,
      serviceUse: false,
      marketing: false,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm({
      ...form,
      terms: {
        ...form.terms,
        [name]: checked,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", form);
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <p>로그인을 위해 이메일과 비밀번호를 입력해주세요!</p>
        <StyledInput
          type="text"
          name="name"
          value={form.name}
          placeholder="이름"
          onChange={handleInputChange}
          required
        />
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
        <StyledInput
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          placeholder="비밀번호 확인"
          onChange={handleInputChange}
          required
        />

        <StyledCheckbox>
          <input
            type="checkbox"
            name="personalInfo"
            checked={form.terms.personalInfo}
            onChange={handleCheckboxChange}
          />
          <label>개인정보 이용 약관 동의</label>
        </StyledCheckbox>
        <StyledCheckbox>
          <input
            type="checkbox"
            name="serviceUse"
            checked={form.terms.serviceUse}
            onChange={handleCheckboxChange}
          />
          <label>서비스 이용 약관 동의</label>
        </StyledCheckbox>
        <StyledCheckbox>
          <input
            type="checkbox"
            name="marketing"
            checked={form.terms.marketing}
            onChange={handleCheckboxChange}
          />
          <label>마케팅 활용 약관 동의</label>
        </StyledCheckbox>

        <StyledButton type="submit">회원가입하기</StyledButton>
        <StyledLoginLink>로그인 바로가기</StyledLoginLink>
      </StyledForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`;

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

export default SignUp;
