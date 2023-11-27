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
`;
export const Title = styled.div`
  color: #000;

  /* Headline 2 */
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 125% */
`;
export const Button1 = styled.button`
  /* margin-top: 10%; */
  border-radius: 20px;
  background: rgb(253, 246, 217);
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  border: none;
  cursor: pointer;
  width: 300px;
  height: 250px;
  flex-shrink: 0;
`;
export const Button2 = styled.button`
  margin-top: 10%;
  border-radius: 20px;
  background: rgb(255, 232, 224);
  color: rgb(27, 27, 29);
  font-family: Arimo;
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  border: none;
  cursor: pointer;
  width: 300px;
  height: 250px;
  flex-shrink: 0;
`;
