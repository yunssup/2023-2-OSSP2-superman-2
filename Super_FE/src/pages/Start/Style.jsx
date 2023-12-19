import styled from "styled-components";
export const BackGround = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 768px;
  max-height: 1024px;
  background-color: rgb(255, 255, 255);
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::after {
    content: "";
    background-image: url("src/pages/Start/찐로고.jpg");
    background-size: 100% 100%;
    height: 50%;
    width: 80%;
    position: absolute;
    top: 25%;
    left: 10%;
    /* right: 25%;
    bottom: 25%; */
    z-index: 1;
  }
`;

export const Title = styled.h1`
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
  z-index: 4;
`;

export const SubTitle = styled.h1`
  color: #000;
  font-family: SUITE;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  z-index: 1;
`;
export const Input = styled.input`
  width: 80%;
  border: none;
  border-bottom: 2px solid #9e8f70;
  font-size: 20px;
  background: transparent;
  outline: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  padding-bottom: 5px;
  color: rgba(0, 0, 0, 0.3);
  font-family: "SUITE";
  z-index: 4;
`;
export const ButtonNext = styled.button`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%); /* 가운데 정렬을 위해 사용 */
  background-color: #bf3a3b;
  width: 60%;
  height: 9%;
  border: none;
  border-radius: 11px;
  color: white;
  font-size: 20px;
  font-family: "SUITE";
  font-weight: 600;
  z-index: 4;
  cursor: pointer;
  font-family: SUITE;
  a {
    text-decoration: none; /* 링크 텍스트의 밑줄 제거 */
    color: inherit; /* 링크의 색상을 상속 받음 */
  }
`;
