import React, { useEffect, useState } from "react";
import {
  ReSort,
  BackGround,
  ReTitle,
  IMGHOME,
  ReContainer,
  ReSort1,
} from "./Style";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CompareResult() {
  const navigate = useNavigate();
  const [userSessionData, setUserSessionData] = useState(null);
  const [transportData, setTransportData] = useState({
    house1: { cost: "", time: "" },
    house2: { cost: "", time: "" },
  });
  // 유저 세션 가져오기
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
  // 이동시간 get 해오기
  useEffect(() => {
    const fetchData = async (url, setDataCallback) => {
      try {
        const response = await axios.get(url);
        setDataCallback(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 에러 발생:", error);
      }
    };

    if (userSessionData) {
      // 이동 시간 데이터 가져오기
      const transportUrl = `http://localhost:8080/api/compare/transport/?user=${userSessionData}&house=1`;
      fetchData(transportUrl, (data) => {
        setTransportData((prevData) => ({
          ...prevData,
          house1: {
            cost: data.cost,
            time: data.time,
          },
        }));
      });

      // 주택 정보 가져오기
      const address = encodeURIComponent("중구 동호로 25가길 34");
      const houseInfoUrl = `http://localhost:8080/api/compare/houseinfo?address=${address}&user=${userSessionData}`;
      fetchData(houseInfoUrl, (data) => setHouseInfo(data.houseInfo));
    }
  }, [userSessionData]);

  // 하단 홈버튼 클릭시 메인으로 이동
  const handleImageClick = () => {
    navigate("/main");
  };

  // 화면 구성 요소
  return (
    <BackGround>
      <ReSort1>
        <ReTitle>1번 집</ReTitle>
        <ReTitle>2번 집</ReTitle>
      </ReSort1>
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
