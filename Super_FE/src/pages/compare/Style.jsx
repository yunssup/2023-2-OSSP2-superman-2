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
`;
export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90%;
`;
export const Title = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
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
`;
export const InputWithBorder = styled.input`
  width: 80%;
  padding: 7%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-bottom: 10px; /* 추가: 하단 여백 */
  border-radius: 5px; /* 추가: 둥근 테두리 */
  outline: none; /* 추가: 포커스 효과 제거 */

  &:focus {
    border-color: black;
  }
`;
