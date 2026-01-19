

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//더미데이터
const dummyMenus = [
  {
    id: 1,
    name: "불닭 치킨",
    price: 18000,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "허니콤보",
    price: 20000,
    imageUrl: "https://via.placeholder.com/150",
  },
];

function Menu() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = ["리뷰관리", "메뉴관리", "매출조회", "가게관리"];

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // fetchMenus();
    setMenus(dummyMenus);
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/menus");
      setMenus(res.data);
    } catch (error) {
      console.error("메뉴 조회 실패", error);
    }
  };

  return (
    <div className="container">
      {/* 사이드바 */}
      <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-logo">logo</div>

        {menuItems.map((item) => (
          <div
            key={item}
            className={`side-menu-item ${
              item === "메뉴관리" ? "active" : ""
            }`}
            onClick={() => {
              if (item === "메뉴관리") navigate("/menu");
            }}
          >
            {item}
          </div>
        ))}
      </aside>

      {/* 콘텐츠 */}
      <div className={`content ${menuOpen ? "shift" : ""}`}>
        <header className="header">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <h3 className="header-title">logo</h3>
        </header>

        <main className="menu-main">
          {/* 상단 버튼 */}
          <div className="menu-top">
            <button
              className="add-menu-btn"
              onClick={() => navigate("/menu/add")}
            >
              + 메뉴 등록하기
            </button>
          </div>

          {/* 메뉴 카드 */}
          <div className="menu-list">
            {menus.length === 0 && (
              <p style={{ padding: "20px" }}>등록된 메뉴가 없습니다.</p>
            )}

            {menus.map((menu) => (
              <div key={menu.id} className="menu-card">
                <div className="menu-image">
                  {menu.imageUrl && (
                    <img src={menu.imageUrl} alt={menu.name} />
                  )}
                </div>

                <div className="menu-info">
                  <div className="menu-title">
                    <div>
                      <h3>{menu.name}</h3>
                      <p>{menu.price}원</p>
                    </div>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/menu/${menu.id}/edit`)}
                    >
                      수정
                    </button>
                  </div>

                  <div className="menu-actions">
                    <button>품절</button>
                    <button>숨김</button>
                    <button>노출기간</button>
                    <button>가격변경</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Menu;
