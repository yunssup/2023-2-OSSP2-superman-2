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

export const UserEnrollText = styled.input`
  width: 50%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 11px;
  font-size: 14px;
  /* margin-bottom: 10px; */
`;
export const FindButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;