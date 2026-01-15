import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add() {
  const navigate = useNavigate();

  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [composition, setComposition] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert("이미지는 최대 5장까지 업로드할 수 있습니다.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  // ✅ 메뉴 등록 (백엔드 연동)
  const handleSubmit = async () => {
    if (!menuName || !price) {
      alert("메뉴명과 가격은 필수입니다.");
      return;
    }

    const formData = new FormData();
    formData.append("name", menuName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("composition", composition);

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    try {
      await axios.post("http://localhost:8080/api/menus", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("메뉴가 등록되었습니다.");
      navigate("/menu");
    } catch (error) {
      console.error("메뉴 등록 실패", error);
      alert("메뉴 등록 실패");
    }
  };

  return (
    <div className="add-container">
      <div className="add-content">
        <h3>메뉴 등록</h3>

        <label>메뉴명</label>
        <input
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
        />

        <label>이미지</label>
        <div className="image-upload">
          {images.map((img, idx) => (
            <div key={idx}>
              <img src={img.preview} alt="" width="80" />
              <button onClick={() => removeImage(idx)}>✕</button>
            </div>
          ))}
          {images.length < 5 && (
            <input type="file" multiple onChange={handleImageUpload} />
          )}
        </div>

        <label>가격</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>구성</label>
        <textarea
          value={composition}
          onChange={(e) => setComposition(e.target.value)}
        />

        <label>설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}

export default Add;
