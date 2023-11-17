import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(253, 246, 217);
  width: 100vh;
`;

export const NavBar = styled.div`
  position: absolute;
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  width: 82vh;
  top: 1vh;
  z-index: 1;
`;

export const NavBarRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80vh;
  margin: 5px;
`;

export const ResultGroup = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  margin-top: 350px;
  right: 30px;
`;

export const NavBarSelect = styled.select`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  margin: 20px;
  background: rgb(255, 232, 224);
  border-radius: 20px;
`;

export const ButtonReturn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-weight: 1000;
  font-size: 35px;
  text-align: center;
  width: 18px;
  height: 18px;
  margin: 20px;
  padding: 20px;
  top: 20px;
  left: 40px;
`;

export const ButtonOrder = styled.button`
  width: 150px;
  height: 30px;
  margin-left: 70%;
  color: rgb(0, 0, 0);
  font-family: Arimo;
  font-size: 14px;
  font-weight: 700;
  border: none;
  background-color: rgb(253, 246, 217);
`;

export const ButtonResult = styled.button`
  display: block;
  width: 80vh;
  height: 113px;
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 35px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  background: rgb(220, 248, 246);
  backdrop-filter: blur(4px);
  border-radius: 20px;
  margin-top: 30px;
`;

export const ResultPara = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vh;
  height: 600px;
  background: rgb(220, 248, 246);
  backdrop-filter: blur(4px);
  border: 2px solid rgb(0, 0, 0);
  border-radius: 20px;
`;

export const ResultHeader = styled.h2`
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 35px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  margin-top: 73px;
  margin-bottom: 0px;
`;

export const ResultSpan = styled.span`
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 25px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 55px;
`;