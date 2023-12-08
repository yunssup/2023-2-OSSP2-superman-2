// Style.js
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
export const AddressSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10%;
  margin-left: 2%;
  margin-right: 2%;
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const AddressContainerInputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const AddressContainerInput = styled.div`
  display: flex;
  flex-direction: row;
`;
export const UserEnrollText = styled.input`
  width: 50%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 14px;
`;
export const UserEnrollTextInput = styled.input`
  width: 90%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-left: 4%;
  margin-top: 5%;
`;
export const FindButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: #00b031;
  color: white;
  border: none;
  font-size: 16px;

  &:hover {
    background-color: #00b031;
  }
`;
export const ButtonHouse = styled.button`
  width: 170px;
  height: 43px;
  flex-shrink: 0;
  color: #fff;
  font-family: Roboto;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  background-color: #00b031;
  border: none;
  margin-top: 3%;
`;
export const InsideContainer = styled.div`
  border-radius: 8px;
  border: 3px solid #000;
  background: var(--button, #f8f8f8);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  text-align: center;
  margin: 2%;
  flex-direction: column;
`;
export const InsideContainerResult = styled.div`
  border-radius: 8px;
  border: 3px solid #000;
  background: var(--button, #f8f8f8);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60%;
  text-align: center;
  margin: 2%;
  flex-direction: column;
  margin-top: 5%;
`;
export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90%;
  margin-top: 5%;
`;
export const Title = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  margin-top: 5%;
`;
export const ButtonGo = styled.button`
  width: 366px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--system-success, #00b031);
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  border: none;
`;
export const InputWithBorder = styled.input`
  width: 80%;
  padding: 5%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-bottom: 10px; /* 추가: 하단 여백 */
  border-radius: 5px; /* 추가: 둥근 테두리 */
  outline: none; /* 추가: 포커스 효과 제거 */
  margin-top: 3%;

  &:focus {
    border-color: black;
  }
`;
export const IMGHOME = styled.img`
  width: 10%; /* Set the width of the image */
  max-width: 10%; /* Ensure the image doesn't exceed its natural size */
  margin-top: 20px; /* Adjust the top margin as needed */
`;
