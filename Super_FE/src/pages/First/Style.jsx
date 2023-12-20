// style.jsx
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
  margin-top: 5%;
`;
export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-top: 5%; */
`;

export const UserEnrollText = styled.input`
  width: 80%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 14px;
`;
export const FindButton = styled.button`
  padding: 15px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 16px;
  width: 50%;
  &:hover {
    background-color: #45a049;
  }
`;
export const Title = styled.h1`
  color: #000;

  /* Headline 2 */
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 125% */

  padding: 10px; /* 텍스트와 텍스트 배경 사이 간격 조절 */
  z-index: 1; /* 다른 요소보다 앞에 표시 */
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column; /* 요소들을 세로로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 20px;
  padding: 10px;
  z-index: 1;
`;

export const ButtonLive = styled.button`
  width: 339px;
  height: 76px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #f8f8f8;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  color: #000;
  font-family: Roboto;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  text-align: center;
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  transition: transform 0.3s ease; /* transition 추가 */

  &:active {
    transform: scale(0.95); /* 클릭 시 스케일 조정 */
  }
`;

export const ButtonMove = styled.button`
  width: 339px;
  height: 76px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #f8f8f8;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  color: #000;
  font-family: Roboto;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  text-align: center;
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  transition: transform 0.3s ease; /* transition 추가 */

  &:active {
    transform: scale(0.95); /* 클릭 시 스케일 조정 */
  }
`;
export const ButtonGo = styled.button`
  width: 339px;
  height: 76px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--grayscale-gray-4, #bdbdbd);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  font-family: Roboto;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 117.647% */
  text-align: center;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 10%;

  transition: transform 0.3s ease; /* transition 추가 */

  &:active {
    transform: scale(0.95); /* 클릭 시 스케일 조정 */
  }
`;
