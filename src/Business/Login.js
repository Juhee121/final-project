import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // 🟢 더미 로그인 로직
    if (email === "test@test.com" && password === "1234") {
      setLoginCheck(false);

      sessionStorage.setItem("token", "dummy-token-1234");
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("role", "ADMIN");
      sessionStorage.setItem("storeid", "1");
      sessionStorage.setItem("userName", "테스트사용자");

      console.log("더미 로그인 성공:", email);
      navigate("/");
    } else {
      setLoginCheck(true);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>On&Off</h1>

        <label htmlFor="username">이메일</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {loginCheck && (
          <label style={{ color: "red" }}>
            이메일 혹은 비밀번호가 틀렸습니다.
          </label>
        )}

        <button type="submit">로그인</button>

        <p className="signup-link">
          아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
