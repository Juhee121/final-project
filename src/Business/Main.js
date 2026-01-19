import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";


function Main() {
  const [userName] = useState(sessionStorage.getItem("userName"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = ["리뷰관리", "메뉴관리", "매출조회", "가게관리"];

  return (
    <div className="container">
      <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-logo">logo</div>

        {menuItems.map((item) => (
          <div
            key={item}
            className="side-menu-item"
            onClick={() => {
              if (item === "메뉴관리") navigate("/menu");
            }}
          >
            {item}
          </div>
        ))}
      </aside>

      <div className={`content ${menuOpen ? "shift" : ""}`}>
        <header className="header">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <h3 className="header-title">logo</h3>
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
        </header>

        <main className="main">
          <div className="profile-box">
            <div className="avatar" />
            <strong>{userName}님</strong>
          </div>

          <div className="pause-box">
            <div>
              <strong>영업 임시중지</strong>
              <p className="sub-text">모든 가게의 영업이 중지됩니다</p>
            </div>

            <div
              className={`switch ${isPaused ? "on" : ""}`}
              onClick={() => setIsPaused(!isPaused)}
            >
              <div className="switch-circle" />
            </div>
          </div>

          <h4 className="menu-title">전체 메뉴</h4>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item} className="menu-item">
                <div className="menu-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
