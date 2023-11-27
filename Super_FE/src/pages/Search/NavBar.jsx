import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  height: 100vh;
  width: 100vw;
`;

export const AddressSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90vh;
  margin-top: 20px;
  margin-left: 100px;
  margin-bottom: 8px;
`;

export const NavBar = styled.div`
  position: absolute;
  display: block;
  height: 20vh;
  width: 82vw;
  top: 1vh;
  left: 2.5vw;
  z-index: 1;
`;

export const NavBarRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70vh;
  margin: 5px;
`;

export const ResultGroup = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
  right: 30px;
`;

export const NavBarSelect = styled.select`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  margin: 20px 15px;
  background: #E8E9EA;
  border-radius: 10px;
`;

export const NavBarConfirm = styled.button`
  color: #FFFFFF;
  background-color: #00B031;
  height: 5vh;
  width: 96%;
  font-size: 20px;
  font-weight: 1000;
  border: none;
  border-radius: 10px;
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
  font-size: 20px;
  text-align: center;
  width: 18px;
  height: 18px;
  margin: 20px;
  margin-bottom: 0;
  padding: 20px;
  left: 40px;
`;

export const ButtonOrder = styled.button`
  width: 150px;
  height: 55px;
  margin-left: 70%;
  color: rgb(0, 0, 0);
  font-family: Arimo;
  font-size: 14px;
  font-weight: 900;
  border: none;
  background: #FFFFFF;
`;

export const ButtonResult = styled.button`
  display: block;
  height: 113px;
  width: 80vw;
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 35px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  background: #FFFFFF;
  backdrop-filter: blur(4px);
  border: 3px solid #00B031;
  border-radius: 12px;
  margin-top: 30px;
`;

export const ResultPara = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  height: 700px;
  background: #FFFFFF;
  backdrop-filter: blur(4px);
  border: 3px solid #00B031;
  border-radius: 20px;
  margin-top: 100px;
`;

export const ResultHeader = styled.h2`
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 35px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  margin-top: 40px;
  margin-bottom: 0px;
`;

export const ResultDiv = styled.div`
  display: flex;
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 25px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  margin-top: 80px;
  width: 60%;
`;

export const ResultSpan = styled.div`
  text-align: left;
  margin-left: 10px;
  width: 30%;
`;

export const ResultValue = styled.div`
  margin-left: 40%;
`;

export const ResultConfirm = styled.button`
  margin-top: 25px;
  border-radius: 50px;
  border: 1px solid rgb(0,0,0) !important;
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  border: none;
  cursor: pointer;
  width: 60px;
  height: 60px;
`;
