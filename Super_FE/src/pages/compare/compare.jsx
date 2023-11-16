import React, { useState } from "react";
import { BackGround, InputContainer, Input, CompareButton } from "./Style";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import Post from "../../Components/Post"; // Post 컴포넌트를 불러와서 사용하도록 추가

function Compare() {
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = () => {
    setPopup(!popup);
  };

  return (
    <div className="address_search">
      address
      <input
        className="user_enroll_text"
        placeholder="주소"
        type="text"
        required={true}
        name="address"
        onChange={handleInput}
        value={enroll_company.address}
      />
      <button onClick={handleComplete}>우편번호 찾기</button>
      {popup && (
        <Post company={enroll_company} setcompany={setEnroll_company} />
      )}
    </div>
  );
}

export default Compare;
