// Compare.jsx
import React, { useState } from "react";
import {
  BackGround,
  AddressSearchContainer,
  UserEnrollText,
  FindButton,
} from "./Style";
import Post from "../../Components/Post";

function Compare() {
  const [enroll_company, setEnroll_company] = useState({
    address1: "",
    address2: "",
  });

  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (field, data) => {
    if (field === "address1") {
      setPopup1(true);
    } else if (field === "address2") {
      setPopup2(true);
    }

    // 우편번호 찾기를 통해 받은 데이터로 입력창을 업데이트합니다.
    setEnroll_company({
      ...enroll_company,
      [field]: data.address, // 예시로 주소를 넣었으니 필요에 따라 수정
    });
    console.log(data);
  };
  const handleClose = (field) => {
    if (field === "address1") {
      setPopup1(false);
    } else if (field === "address2") {
      setPopup2(false);
    }
  };

  return (
    <BackGround>
      <AddressSearchContainer>
        <UserEnrollText
          placeholder="주소 찾기 클릭!"
          type="text"
          required={true}
          name="address1"
          onChange={handleInput}
          value={enroll_company.address1}
        />
        <FindButton onClick={() => handleComplete("address1")}>
          주소 찾기
        </FindButton>
        {popup1 && (
          <Post
            company={enroll_company}
            setcompany={setEnroll_company}
            onComplete={(data) => handleComplete("address1", data)}
            onClose={() => handleClose("address1")}
          />
        )}
        <UserEnrollText
          placeholder="주소 찾기 클릭!"
          type="text"
          required={true}
          name="address2"
          onChange={handleInput}
          value={enroll_company.address2}
        />
        <FindButton onClick={() => handleComplete("address2")}>
          주소 찾기
        </FindButton>
        {popup2 && (
          <Post
            company={enroll_company}
            setcompany={setEnroll_company}
            onComplete={(data) => handleComplete("address2", data)}
            onClose={() => handleClose("address2")}
          />
        )}
      </AddressSearchContainer>
    </BackGround>
  );
}

export default Compare;
