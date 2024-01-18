import React from "react";
import { BackGround, Button1, Button2, Title } from "./Style";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const handleButtonClick = (buttonType) => {
    switch (buttonType) {
      case "Button1":
        navigate("/Search");
        break;
      case "Button2":
        navigate("/Compare");
        break;
      default:
        break;
    }
  };

  return (
    <BackGround>
      <Title>원하는 서비스를 선택하세요</Title>
      <Button1 onClick={() => handleButtonClick("Button1")}>
        조건대로
        <br />
        알아보기
      </Button1>

      <Button2 onClick={() => handleButtonClick("Button2")}>
        어느 집이
        <br />
        저렴할까?
      </Button2>
    </BackGround>
  );
}

export default Main;
