import React, { useState } from "react";
import { validator } from "../../utils";

const AuthPage: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  const { validateEmail, validatePassword } = validator;

  const validateForm = () => {
    return validateEmail(email) && validatePassword(password);
  };

  const handleChangeForm = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <input
        type={"email"}
        value={email}
        name={"email"}
        onChange={handleChangeForm}
      />
      <input
        type={"password"}
        value={password}
        name={"password"}
        onChange={handleChangeForm}
      />
      <button disabled={!validateForm()}>로그인</button>
    </div>
  );
};

export default AuthPage;
