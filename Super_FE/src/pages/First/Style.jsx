// style.jsx
import styled from "styled-components";

export const BackGround = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 768px;
  max-height: 1024px;
  background-color: #dcf8f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  color: #333;
  font-size: 36px;
  margin-bottom: 20px;
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
  border-radius: 20px;
  background: rgb(253, 246, 217);
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 25px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0px;
  text-align: center;
  border: none;
  cursor: pointer;
  width: 201px;
  height: 59px;
  flex-shrink: 0;
  outline: none; /* 포커스 시 기본 아웃라인 제거 */
  &:focus {
    border: 2px solid #000; /* 포커스 시 테두리 적용 */
  }
`;

export const ButtonMove = styled.button`
  border-radius: 20px;
  background: rgb(255, 232, 224);
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 25px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0px;
  text-align: center;
  border: none;
  cursor: pointer;
  width: 201px;
  height: 59px;
  flex-shrink: 0;
  outline: none; /* 포커스 시 기본 아웃라인 제거 */
  &:focus {
    border: 2px solid #000; /* 포커스 시 테두리 적용 */
  }
`;
export const ButtonGo = styled.button`
  border-radius: 20px;
  background: rgb(255, 232, 224);
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 25px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0px;
  text-align: center;
  border: none;
  cursor: pointer;
  width: 201px;
  height: 59px;
  flex-shrink: 0;
  outline: none; /* 포커스 시 기본 아웃라인 제거 */
  &:focus {
    border: 2px solid #000; /* 포커스 시 테두리 적용 */
  }
`;
