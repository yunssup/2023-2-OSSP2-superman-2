import React, { useState } from "react";
import { Container, Title, ButtonGroup, ButtonLive, ButtonMove, ButtonGo } from "./Style";

function First() {
  const [liveSelected, setLiveSelected] = useState(false); // 월세 선택 상태
  const [moveSelected, setMoveSelected] = useState(false); // 대중교통 선택 상태

  const handleLiveClick = () => {
    setLiveSelected(!liveSelected); // 월세 선택 상태 토글
    if (liveSelected && moveSelected) {
      setMoveSelected(false); // 대중교통 선택 상태 해제
    }
  };

  const handleMoveClick = () => {
    setMoveSelected(!moveSelected); // 대중교통 선택 상태 토글
    if (liveSelected && moveSelected) {
      setLiveSelected(false); // 월세 선택 상태 해제
    }
  };

  const handleGoClick = () => {
    if (liveSelected && moveSelected) {
       //선택 완료 했을 시 다음 페이지로 이동
    }
  };

  return (
    <Container>
      <Title>어떻게 살까?</Title>
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
          onClick={handleLiveClick}
        >
          전세
        </ButtonLive>
      </ButtonGroup>
      <Title>어떻게 다닐까?</Title>
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
          onClick={handleMoveClick}
        >
          자차
        </ButtonMove>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGo
          tabIndex="0"
          onClick={handleGoClick}
        >
          선택 완료
        </ButtonGo>
      </ButtonGroup>
    </Container>
  );
}

export default First;
