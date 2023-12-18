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

function Compare() {
  const navigate = useNavigate();

  // 세션 가져오기
  const [userSessionData, setUserSessionData] = useState(null);
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user", {
          withCredentials: true,
        });

        const userData = response.data;
        setUserSessionData(userData.session_id);
        console.log("유저 세션 데이터:", userData);
      } catch (error) {
        console.error("유저 세션 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchUserSession();
  }, []);

  // API 호출 및 결과 상태 관리
  const [compareData, setCompareData] = useState({
    house1: null,
    house2: null,
  });

  const fetchData = async () => {
    try {
      const responseHouse1 = await axios.get(
        `http://localhost:8080/api/compare/TravalTime/?user=${userSessionData}&house=1`
      );
      const responseHouse2 = await axios.get(
        `http://localhost:8080/api/compare/TravalTime/?user=${userSessionData}&house=2`
      );

      const dataHouse1 = responseHouse1.data;
      const dataHouse2 = responseHouse2.data;

      setCompareData({
        house1: dataHouse1,
        house2: dataHouse2,
      });

      console.log("Compare API 응답:", dataHouse1, dataHouse2);
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

    console.log("Show Results:", compareData);
    // 결과를 어떻게 보여줄지에 대한 구체적인 로직을 추가하세요.
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

export default Compare;
