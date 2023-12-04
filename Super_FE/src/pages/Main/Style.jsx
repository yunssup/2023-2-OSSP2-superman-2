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
  border-radius: 8px;
  border: 5px solid var(--system-success, #00b031);
  background: var(--grayscale-white, #fff);
  box-shadow: 0px 16px 16px 0px rgba(0, 0, 0, 0.25);
  width: 334px;
  height: 224px;
  flex-shrink: 0;
  color: #000;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 117.647% */
  margin: 10%;
`;
export const Button2 = styled.button`
  border-radius: 8px;
  border: 5px solid var(--system-success, #00b031);
  background: var(--grayscale-white, #fff);
  box-shadow: 0px 16px 16px 0px rgba(0, 0, 0, 0.25);
  width: 334px;
  height: 224px;
  flex-shrink: 0;
  color: #000;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 117.647% */
`;
