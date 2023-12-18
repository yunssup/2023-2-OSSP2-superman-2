import styled from "styled-components";

export const BackGround = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 768px;
  max-height: 1024px;
  background: var(--grayscale-white, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
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
  justify-content: center;
  height: 50px;
  width: 100%;
  margin: 20px;
`;

export const ResultGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 270px;
  height: calc(100vh - 270px);
  width: 100%;
`;

export const NavBarSelect = styled.select`
  display: flex;
  height: 50px;
  width: 100%;
  margin: 0 10px 12px;
  background: #e8e9ea;
  border-radius: 10px;
`;

export const NavBarConfirm = styled.button`
  color: #ffffff;
  background-color: #00b031;
  height: 40px;
  width: 96%;
  font-size: 20px;
  font-weight: 1000;
  border: none;
  border-radius: 10px;
`;

export const ButtonReturn = styled.button`
  position: absolute;
  background-image: url("public/start/close.png");
  border: none;
  display: flex;
  border-radius: 50px;
  width: 24px;
  height: 24px;
  top: 10px;
  right: 10px;
`;

export const ButtonOrder = styled.button`
  display: flex;
  width: 200px;
  height: 40%;
  color: rgb(0, 0, 0);
  font-family: Arimo;
  font-size: 14px;
  font-weight: 900;
  border: none;
  background: #ffffff;
`;

export const ButtonResult = styled.button`
  /*display: block;*/
  height: 113px;
  width: 90%;
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 35px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  background: #ffffff;
  backdrop-filter: blur(4px);
  border: 3px solid #00b031;
  border-radius: 12px;
  margin-top: 30px;
  display: none;
`;

export const ResultPara = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: calc(100vh - 310px);
  background: #ffffff;
  backdrop-filter: blur(4px);
  border: 3px solid #00b031;
  border-radius: 20px;
`;

export const ResultHeader = styled.h2`
  height: 20%;
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

export const ResultConfirm = styled.img`
  margin-top: 25px;
  margin-bottom: 25px;
  font-family: Arimo;
  width: 10%;
  height: 10%;
`;
export const IMGHOME = styled.img`
  width: 10%; /* Set the width of the image */
  max-width: 10%; /* Ensure the image doesn't exceed its natural size */
  margin-top: 20px; /* Adjust the top margin as needed */
`;
