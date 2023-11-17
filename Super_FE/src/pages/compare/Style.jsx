// Style.js
import styled from "styled-components";

export const BackGround = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 768px;
  max-height: 1024px;
  background-color: rgb(255, 232, 224);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const AddressSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-bottom: 20px; */
`;

export const AddressContainer = styled.div`
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

const InfoText = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

export const InsideContainer = styled.div`
  background-color: rgb(253, 246, 217);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
  text-align: center;
  /* margin-left: 2%; */
  margin: 2%;
  flex-direction: column;
`;

export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 90%;
  height: 80%;
  /* flex-direction: column; */
`;
