// First.js
import React, { useState } from "react";
import {
  Title,
  ButtonGroup,
  ButtonLive,
  ButtonMove,
  BackGround,
  ButtonGo,
} from "./Style";
import LiveModal from "../../Components/LiveModal"; // Import the LiveModal component
import MoveModal from "../../Components/GoModal"; // Import the MoveModal component

function First() {
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

  const handleCloseLiveModal = () => {
    setLiveModalOpen(false);
  };

  const handleMoveModalClick = () => {
    setMoveModalOpen(true);
  };

  const handleCloseMoveModal = () => {
    setMoveModalOpen(false);
  };

  return (
    <BackGround>
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
          onClick={handleGoClick}
        >
          전세
        </ButtonLive>
        <LiveModal isOpen={isLiveModalOpen} onClose={handleCloseLiveModal} />
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
          onClick={handleMoveModalClick}
        >
          자차
        </ButtonMove>
        <MoveModal isOpen={isMoveModalOpen} onClose={handleCloseMoveModal} />
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGo>선택 완료</ButtonGo>
      </ButtonGroup>
    </BackGround>
  );
}

export default First;
