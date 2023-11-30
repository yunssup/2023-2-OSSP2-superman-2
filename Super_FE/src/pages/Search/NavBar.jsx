import styled from "styled-components";

export const SearchContainer = styled.div`
  display: block;
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
  display: block;
  height: 0%;
  width: 100%;
  top: 10%;
  left: 2.5vw;
  z-index: 1;
`;

export const NavBarRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const NavBarSpan = styled.span`
  display: flex;
  align-items: center;
  height: 50px;
  width: 66.6%;
  margin: 20px 15px;
`;

export const ResultGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 250px;
  height: calc(100vh - 270px);
`;

export const NavBarSelect = styled.select`
  display: flex;
  height: 50px;
  width: 33%;
  margin: 20px 15px;
  background: #E8E9EA;
  border-radius: 10px;
`;

export const NavBarConfirm = styled.button`
  color: #FFFFFF;
  background-color: #00B031;
  height: 40px;
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
  width: 200px;
  height: 55px;
  margin-left: 60%;
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
  width: 90%;
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
  height: calc(100vh - 310px);
  background: #FFFFFF;
  backdrop-filter: blur(4px);
  border: 3px solid #00B031;
  border-radius: 20px;
`;

export const ResultHeader = styled.h2`
  height: 10%;
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 35px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
`;

export const ResultDiv = styled.div`
  display: flex;
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 25px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  height: 16%;
  width: 100%;
`;

export const ResultSpan = styled.div`
  text-align: center;
  width: 50%;
`;

export const ResultValue = styled.div`
  text-align: center;
  width: 50%;
`;

export const ResultConfirm = styled.button`
  margin-top: 25px;
  margin-bottom: 25px;
  border-radius: 50px;
  background-image: url("public/start/home.png");
  border: 1px solid rgb(0,0,0) !important;
  font-family: Arimo;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  width: 48px;
  height: 50px;
`;
