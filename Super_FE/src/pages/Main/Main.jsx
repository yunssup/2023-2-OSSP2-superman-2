import React from "react";
import { BackGround, Button1, Button2 } from "./Style";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const handleButtonClick = (buttonType) => {
    switch (buttonType) {
      case "Button1":
        navigate("/First"); // Navigate to the page you want when Button 1 is clicked
        break;
      case "Button2":
        navigate("/First"); // Navigate to the page you want when Button 2 is clicked (replace "/Second" with the correct path)
        break;
      default:
        break;
    }
  };

  return (
    <BackGround>
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
