import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost/api/v1/store-owner/auth/login", {
        email: email,
        password: password,
      });

      // 로그인 성공
      // setLoginCheck(false);

      sessionStorage.setItem("token", res.data);
      sessionStorage.setItem("userName", res.data.userName);
      sessionStorage.setItem("role", res.data.role);
      sessionStorage.setItem("storeid", res.data.storeId);

      console.log(res.data.storeOwnerId);
      console.log(res.data.storeOwnerName);
      console.log(res.data.roleName);


      navigate("/main");
    } catch (error) {
      console.error("로그인 실패", error);
      setLoginCheck(true);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>로그인</h1>

        <label>이메일</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>비밀번호</label>
        <input
          type="password"
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
