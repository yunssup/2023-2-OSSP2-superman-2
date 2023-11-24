// First.js
import React, { useState } from "react";
import {
  Title,
  ButtonGroup,
  ButtonLive,
  ButtonMove,
  BackGround,
  ButtonGo,
  UserEnrollText,
  AddressContainer,
  FindButton,
} from "./Style";

import LiveModal from "../../Components/LiveModal";
import MoveModal from "../../Components/GoModal";
import { useNavigate } from "react-router-dom";
import Post from "../../Components/Post";

function First() {
  const navigate = useNavigate(); // Initialize the navigate function

  const [liveSelected, setLiveSelected] = useState(false);
  const [moveSelected, setMoveSelected] = useState(false);
  const [isLiveModalOpen, setLiveModalOpen] = useState(false);
  const [isMoveModalOpen, setMoveModalOpen] = useState(false);

  const handleLiveClick = () => {
    setLiveSelected(!liveSelected);
    if (liveSelected && moveSelected) {
      setMoveSelected(false);
    }
  };

  const handleMoveClick = () => {
    setMoveSelected(!moveSelected);
    if (liveSelected && moveSelected) {
      setLiveSelected(false);
    }
  };

  const handleGoClick = () => {
    setLiveModalOpen(true);
  };

  const handleCompleteClick = () => {
    navigate("/main"); // Navigate to main.jsx when the button is clicked
  };

  const handleCloseLiveModal = () => {
    setLiveModalOpen(false);
  };

  const handleMoveModalClick = () => {
    setMoveModalOpen(true);
  };

  const handleCloseMoveModal = () => {
    setMoveModalOpen(false);
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
  return (
    <BackGround>
      <Title>거주 유형을 선택해주세요</Title>
      <ButtonGroup>
        <ButtonLive
          tabIndex="0"
          isSelected={liveSelected}
          onClick={handleLiveClick}
        >
          월세
        </ButtonLive>
        <ButtonLive
          tabIndex="0"
          isSelected={liveSelected}
          onClick={handleGoClick}
        >
          전세
        </ButtonLive>
        <LiveModal isOpen={isLiveModalOpen} onClose={handleCloseLiveModal} />
      </ButtonGroup>
      <Title>이동 수단을 선택해주세요</Title>
      <ButtonGroup>
        <ButtonMove
          tabIndex="0"
          isSelected={moveSelected}
          onClick={handleMoveClick}
        >
          대중교통
        </ButtonMove>
        <ButtonMove
          tabIndex="0"
          isSelected={moveSelected}
          onClick={handleMoveModalClick}
        >
          자차
        </ButtonMove>
        <MoveModal isOpen={isMoveModalOpen} onClose={handleCloseMoveModal} />
      </ButtonGroup>
      <Title>자주 가는 장소를 등록해주세요</Title>

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
      <ButtonGroup>
        <ButtonGo onClick={handleCompleteClick}>선택 완료</ButtonGo>
      </ButtonGroup>
    </BackGround>
  );
}

export default First;
