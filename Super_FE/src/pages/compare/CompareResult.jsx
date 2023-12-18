import React, { useEffect, useState } from "react";
import { ReSort, BackGround, ReTitle, IMGHOME, ReContainer } from "./Style";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CompareResult() {
  const navigate = useNavigate();
  const [userSessionData, setUserSessionData] = useState(null);
  const [transportData, setTransportData] = useState({
    house1: { cost: "", time: "" },
    house2: { cost: "", time: "" },
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/compare/transport/?user=${userSessionData}&house=1`
        );

        setTransportData((prevData) => ({
          ...prevData,
          house1: {
            cost: response.data.cost,
            time: response.data.time,
          },
        }));
      } catch (error) {
        console.error("이동 시간 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    if (userSessionData) {
      fetchData();
    }
  }, [userSessionData]);

  // 하단 홈버튼 클릭시 메인으로 이동
  const handleImageClick = () => {
    navigate("/main");
  };

  // 화면 구성 요소
  return (
    <BackGround>
      <ReSort>
        <ReTitle>1번 집</ReTitle>
        <ReTitle>2번 집</ReTitle>
      </ReSort>
      <ReSort>
        <ReContainer>예상 비용 1번 집: {transportData.house1.cost}</ReContainer>
        <ReContainer>예상 비용 2번 집: {transportData.house2.cost}</ReContainer>
      </ReSort>
      <ReSort>
        <ReContainer>이동 시간 1번 집: {transportData.house1.time}</ReContainer>
        <ReContainer>이동 시간 2번 집: {transportData.house2.time}</ReContainer>
      </ReSort>
      <IMGHOME
        src="public/start/home.png"
        alt="Result Image"
        onClick={handleImageClick}
      />
    </BackGround>
  );
}

export default CompareResult;
