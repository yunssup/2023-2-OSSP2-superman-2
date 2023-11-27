// Compare.jsx
import React, { useState } from "react";
import {
  BackGround,
  AddressSearchContainer,
  UserEnrollText,
  AddressContainer,
  FindButton,
  InsideContainer,
  RowContainer,
  InsideContainerResult,
  Title,
  ButtonGo,
  InputWithBorder,
  IMGHOME,
} from "./Style";
import Post from "../../Components/Post";
import { useNavigate } from "react-router-dom";

function Compare() {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/main"); // 이동하고자 하는 경로를 입력합니다.
  };
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
    console.log(`${e.target.name}: ${e.target.value}`);
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
  const handleShowResults = () => {
    // 여기에 결과를 보여주는 로직을 추가하세요.
    // enroll_company 객체에서 필요한 값을 가져와서 활용하면 됩니다.
    console.log("Show Results:", enroll_company);
    // 결과를 어떻게 보여줄지에 대한 구체적인 로직을 추가하세요.
  };
  return (
    <BackGround>
      <AddressSearchContainer>
        <AddressContainer>
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
        </AddressContainer>
        <AddressContainer>
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
        </AddressContainer>
      </AddressSearchContainer>
      <RowContainer>
        <InsideContainer>
          월세
          <br />
          값 불러올 자리
          <br />
          전세
          <br />
          값 불러올 자리
          <br />
          대출이자
          <br />
          값 불러올 자리
          <br />
          교통비
          <br />
          값 불러올 자리
          <br />
          유류비
        </InsideContainer>
        <InsideContainer>
          월세
          <br />
          값 불러올 자리
          <br />
          전세
          <br />
          값 불러올 자리
          <br />
          대출이자
          <br />
          값 불러올 자리
          <br />
          교통비
          <br />
          값 불러올 자리
          <br />
          유류비
        </InsideContainer>
      </RowContainer>
      <Title>↓ 직접 입력해주세요 ↓</Title>
      <RowContainer>
        <InsideContainerResult>
          <InputWithBorder
            placeholder="전기세"
            type="text"
            required={true}
            name="전기세"
            onChange={handleInput}
            value={enroll_company.electricityExpense}
          />
          <InputWithBorder
            placeholder="관리비"
            type="text"
            required={true}
            name="관리비"
            onChange={handleInput}
            value={enroll_company.managementExpense}
          />
          <InputWithBorder
            placeholder="통신비"
            type="text"
            required={true}
            name="통신비"
            onChange={handleInput}
            value={enroll_company.communicationExpense}
          />
        </InsideContainerResult>

        <InsideContainerResult>
          <InputWithBorder
            placeholder="전기세"
            type="text"
            required={true}
            name="electricityExpense2"
            onChange={handleInput}
            value={enroll_company.electricityExpense2}
          />
          <InputWithBorder
            placeholder="관리비"
            type="text"
            required={true}
            name="managementExpense2"
            onChange={handleInput}
            value={enroll_company.managementExpense2}
          />
          <InputWithBorder
            placeholder="통신비"
            type="text"
            required={true}
            name="communicationExpense2"
            onChange={handleInput}
            value={enroll_company.communicationExpense2}
          />
        </InsideContainerResult>
      </RowContainer>
      <ButtonGo onClick={handleShowResults}>결과 보기</ButtonGo>
      <IMGHOME
        src="public/start/home.png" // Replace this with the actual path or URL of your image
        alt="Result Image"
        onClick={handleImageClick}
      />
    </BackGround>
  );
}

export default Compare;
