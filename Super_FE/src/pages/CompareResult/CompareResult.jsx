import React, { useState, useEffect } from "react";
import {
  BackGround,
  AddressSearchContainer,
  AddressContainer,
  InsideContainer,
  RowContainer,
  ButtonGo,
  IMGHOME,
} from "./Style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../UserContext";

function CompareResult() {
  const navigate = useNavigate();
  const { userSessionData } = useUser();

  // 세션 가져오기
  // const [userSessionData, setUserSessionData] = useState(null);
  // useEffect(() => {
  //   const fetchUserSession = async () => {
  //     try {
  //       const response = await axios.get("http://52.78.118.198:8080/api/user", {
  //         withCredentials: true,
  //       });

  //       const userData = response.data;
  //       setUserSessionData(userData.session_id);
  //       console.log("유저 세션 데이터:", userData);
  //     } catch (error) {
  //       console.error("유저 세션 데이터를 가져오는 중 에러 발생:", error);
  //     }
  //   };

  //   fetchUserSession();
  // }, []);

  // API 호출 및 결과 상태 관리
  const [compareData, setCompareData] = useState({
    house1: null,
    house2: null,
  });
  const [transportCosts, setTransportCosts] = useState([null, null]);
  const [rent1, setRent1] = useState(null);
  const [rent2, setRent2] = useState(null);
  const [loanInterest1, setLoanInterest1] = useState(null);
  const [loanInterest2, setLoanInterest2] = useState(null);
  const [comparePrc, setComparePrc] = useState(null);
  const fetchData = async () => {
    try {
      const responseHouse1 = await axios.get(
        `http://52.78.118.198:8080/api/compare/TravalTime/?user=${userSessionData}&house=1`
      );
      const responseHouse2 = await axios.get(
        `http://52.78.118.198:8080/api/compare/TravalTime/?user=${userSessionData}&house=2`
      );

      const dataHouse1 = responseHouse1.data;
      const dataHouse2 = responseHouse2.data;

      setCompareData({
        house1: dataHouse1,
        house2: dataHouse2,
      });

      console.log("Compare API 응답:", dataHouse1, dataHouse2);

      console.log("Show Results:", compareData);
      console.log("Transport Costs:", transportCosts);
      console.log("Rent for House 1:", rent1);
      console.log("Rent for House 2:", rent2);
      console.log("Loan Interest for House 1:", loanInterest1);
      console.log("Loan Interest for House 2:", loanInterest2);
      console.log("Compare Price:", comparePrc);
    } catch (error) {
      console.error("Compare API 호출 중 에러 발생:", error);
    }
  };

  // 컴포넌트가 마운트되면 API 호출
  useEffect(() => {
    if (userSessionData) {
      fetchData();
    }
  }, [userSessionData]);

  const handleShowResults = () => {
    navigate("/Compare");
  };

  // 하단 홈 버튼 클릭 시 메인 화면으로 복귀
  const handleImageClick = () => {
    navigate("/main");
  };

  return (
    <BackGround>
      <AddressSearchContainer>
        <AddressContainer>1번 집</AddressContainer>
        <AddressContainer>2번 집</AddressContainer>
      </AddressSearchContainer>

      <RowContainer>
        <InsideContainer>
          {compareData.house1 ? (
            <>
              예상 비용 <br />
              이동 시간: {compareData.house1.travel_time}
            </>
          ) : (
            "로딩 중..."
          )}
        </InsideContainer>
        <InsideContainer>
          {compareData.house2 ? (
            <>
              예상 비용 <br />
              이동 시간: {compareData.house2.travel_time}
            </>
          ) : (
            "로딩 중..."
          )}
        </InsideContainer>
      </RowContainer>

      <ButtonGo onClick={handleShowResults}>다시 알아보기</ButtonGo>
      <IMGHOME
        src="public/start/home.png"
        alt="Result Image"
        onClick={handleImageClick}
      />
    </BackGround>
  );
}

export default CompareResult;
