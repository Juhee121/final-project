import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { menuId } = useParams(); // URL에서 id 꺼내기
  const navigate = useNavigate();

  const [menu, setMenu] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchMenuDetail();
  }, []);

  const fetchMenuDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/menus/${menuId}`
      );
      setMenu(res.data);
    } catch (error) {
      console.error("메뉴 조회 실패", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/menus/${menuId}`,
        menu
      );
      alert("메뉴 수정 완료!");
      navigate("/menu");
    } catch (error) {
      console.error("메뉴 수정 실패", error);
    }
  };

  return (
    <div className="menu-edit-container">
      <h2>메뉴 수정</h2>

      <label>메뉴명</label>
      <input
        name="name"
        value={menu.name}
        onChange={handleChange}
      />

      <label>가격</label>
      <input
        name="price"
        value={menu.price}
        onChange={handleChange}
      />

      <label>이미지 URL</label>
      <input
        name="imageUrl"
        value={menu.imageUrl}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>수정 완료</button>
      <button onClick={() => navigate(-1)}>취소</button>
    </div>
  );
};

export default Edit;
