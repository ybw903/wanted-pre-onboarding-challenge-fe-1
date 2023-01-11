import { useState } from "react";

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        type={"email"}
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />
      <input
        type={"password"}
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />
      <button>로그인</button>
    </div>
  );
};

export default AuthPage;
