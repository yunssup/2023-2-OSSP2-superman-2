import React, { useState } from "react";
import { BackGround, Button1, Button2 } from "./Style"; // Assuming you have a Button component in your Style file

function Main() {
  const handleButtonClick = (buttonType) => {
    // Handle button click logic based on the buttonType
    console.log(`Button ${buttonType} clicked`);
  };

  return (
    <BackGround>
      {/* Button 1 */}
      <Button1 onClick={() => handleButtonClick("Button1")}>
        조건대로
        <br />
        알아보기
      </Button1>

      {/* Button 2 */}
      <Button2 onClick={() => handleButtonClick("Button2")}>
        어느 집이
        <br />
        저렴할까?
      </Button2>
    </BackGround>
  );
}

export default Main;
