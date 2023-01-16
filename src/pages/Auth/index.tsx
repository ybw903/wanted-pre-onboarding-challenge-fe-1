import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api";
import { Button } from "../../components";
import Input from "../../components/Input";
import { useRedirectByVadlidToken } from "../../hooks";
import { localStorageManager, validator } from "../../utils";

import "./index.scss";

const AuthPage: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  useRedirectByVadlidToken();

  const { email, password } = form;

  const { validateEmail, validatePassword } = validator;
  const { setToken } = localStorageManager;

  const validateForm = () => {
    return validateEmail(email) && validatePassword(password);
  };

  const handleChangeForm = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = () => {
    authAPI.login(form).then((result) => {
      const { token } = result;
      setToken(token);
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="auth-root">
      <div className="auth-form">
        <div className="form-input-container">
          <h3 className="title">로그인</h3>
          <Input
            type={"email"}
            value={email}
            name={"email"}
            onChange={handleChangeForm}
            placeholder={"이메일"}
          />
          <Input
            type={"password"}
            value={password}
            name={"password"}
            onChange={handleChangeForm}
            placeholder={"password"}
          />
        </div>

        <Button disabled={!validateForm()} onClick={handleSubmitForm}>
          로그인
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
