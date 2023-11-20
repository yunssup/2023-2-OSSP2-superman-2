import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(253, 246, 217);
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

export const UserEnrollText = styled.input`
  width: 50%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 14px;
`;
export const FindButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

export const NavBar = styled.div`
  position: absolute;
  display: block;
  height: 20vh;
  width: 82vh;
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
  height: 113px;
  width: 80vw;
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
  width: 80vw;
  height: 700px;
  background: rgb(220, 248, 246);
  backdrop-filter: blur(4px);
  border: 2px solid rgb(0, 0, 0);
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

export const ResultSpan = styled.span`
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 25px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  text-align: left;
  margin-top: 80px;
`;

export const ResultConfirm = styled.button`
  margin-top: 50px;
  border-radius: 20px;
  border: 1px solid rgb(0,0,0) !important;
  background: rgb(255, 232, 224);
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  border: none;
  cursor: pointer;
  width: 300px;
  height: 200px;
`;
