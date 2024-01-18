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
  /* align-items: center; */
  justify-content: center;
`;

export const AddressSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10%;
  margin-left: 17%;
  margin-right: 17%;
  justify-content: space-between;

  color: #00b031;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  /* Headline 2 */
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 125% */
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  justify-content: center;
  align-items: center;
  margin-left: 3%;
`;

export const IMGHOME = styled.img`
  width: 10%; /* Set the width of the image */
  max-width: 10%; /* Ensure the image doesn't exceed its natural size */
  margin-top: 20px; /* Adjust the top margin as needed */
  margin-left: 45%;
`;
