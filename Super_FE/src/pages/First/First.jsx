// First.js
import React, { useState, useEffect } from "react";
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
import axios from "axios";

function First() {
  const navigate = useNavigate();

  const [liveSelected, setLiveSelected] = useState(false);
  const [moveSelected, setMoveSelected] = useState(false);
  const [isLiveModalOpen, setLiveModalOpen] = useState(false);
  const [isMoveModalOpen, setMoveModalOpen] = useState(false);
  const [userSessionData, setUserSessionData] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user", {
          withCredentials: true,
        });

        const userData = response.data;
        setUserSessionData(userData.session_id); // session_id 값을 setUserSessionData로 설정
        console.log("유저 세션 데이터:", userData);
      } catch (error) {
        console.error("유저 세션 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchUserSession();
  }, []);

  const handleLiveClick = () => {
    setLiveSelected(true);
    setMoveSelected(false);
    console.log("Live Button Clicked");
  };

  const handleGoClick = () => {
    setLiveSelected(false);
    setMoveSelected(false);
    setLiveModalOpen(true);
    console.log("Go Button Clicked");
  };

  const handleMoveClick = () => {
    setMoveSelected(true);
    setLiveSelected(false);
    console.log("Move Button Clicked");
  };

  const handleMoveModalClick = () => {
    setMoveSelected(true);
    setLiveSelected(false);
    setMoveModalOpen(true);
    console.log("Move Modal Button Clicked");
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

    setEnroll_company({
      ...enroll_company,
      [field]: data.address,
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

  const handleCompleteClick = async () => {
    if (!userSessionData) {
      console.error("유저 세션 데이터가 없습니다.");
      return;
    }

    let homeTypeValue = liveSelected ? 1 : 2;
    let transportationTypeValue = moveSelected ? 2 : 1;

    const requestData = {
      OftenPlace: enroll_company.address1,
      HomeType: homeTypeValue,
      TransportationType: transportationTypeValue,
      FuelCost: 0,
      전세이자: 0,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/update/${userSessionData}`,
        requestData,
        {
          withCredentials: true,
        }
      );
      console.log("백엔드 응답:", response.data);
      alert(
        `백엔드에 전송된 주소: http://localhost:8080/api/user/update/${userSessionData}`
      );
    } catch (error) {
      console.error("백엔드와 통신 중 오류 발생:", error);
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
          isSelected={!liveSelected}
          onClick={handleGoClick}
        >
          전세
        </ButtonLive>
        <LiveModal isOpen={isLiveModalOpen} onClose={handleCloseMoveModal} />
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
          isSelected={!moveSelected}
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
