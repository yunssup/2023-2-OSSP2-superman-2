import React, { useState, useEffect } from "react";
import {
  BackGround,
  SearchContainer,
  NavBar,
  NavBarSpan,
  NavBarRow,
  NavBarSelect,
  NavBarConfirm,
  ResultGroup,
  ButtonReturn,
  ButtonOrder,
  ButtonResult,
  ResultConfirm,
} from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../Components/Post";
import axios from "axios";

function Search() {
  const [userSessionData, setUserSessionData] = useState(null);
  const [condition, setCondition] = useState("0");
  const [selectedOptions, setSelectedOptions] = useState({
    select1: "",
    select2: "",
    select3: "",
    select4: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user", {
          withCredentials: true,
        });

        const userData = response.data;
        setUserSessionData(userData.session_id); // session_id 값을 setUserSessionData로 설정
        console.log("유저 세션 데이터:", userData);
      } catch (error) {
        console.error("유저 세션 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    //SearchResult에서 돌아왔을 때 자동으로
    handleResultConfirm();
  }, [userSessionData]);

  const handleResultConfirm = () => {
    const result = document.getElementsByClassName("result");
    axios
      .get(
        `http://localhost:8080/api/region?userid=${userSessionData}&regionid=${parseInt(
          selectedOptions.select1
        )}&condition=${parseInt(selectedOptions.select2)}&range=${parseInt(
          selectedOptions.select3
        )}&maxtraval=${parseInt(selectedOptions.select4)}`
      )
      .then((response) => {
        const data = response.data;
        //배열의 각 객체에 대해 처리
        for (let i = 0; i < 4; i++) {
          const place = data[i][i + 1].place; // 데이터에서 장소 가져오기
          const element = document.querySelector(
            `#resultGroup :nth-child(${i + 1})`
          );
          element.innerHTML = place; // DOM에 데이터 삽입
        }

        for (let i = 0; i < result.length; i++) {
          //투명상태 해제
          result[i].style.display = "block";
        }
        document.getElementById("span").innerHTML =
          "원하는 동네를 클릭해서 자세한 정보를 확인하세요!";
      })
      .catch((error) => {
        console.error("에러 발생", error);
        document.getElementById("span").innerHTML =
          "선택한 장소 정보를 찾을 수 없습니다.";
      });
  };

  const handleConfirmClick = () => {
    navigate("/main");
  };

  const handleSelectChange = (event, selectNumber) => {
    const { value } = event.target;
    setSelectedOptions({
      ...selectedOptions,
      [selectNumber]: value,
    });

    if (selectNumber === "select2") {
      setCondition(value);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const select1 = searchParams.get("select1") || "";
    const select2 = searchParams.get("select2") || "0";
    const select3 = searchParams.get("select3") || "";
    const select4 = searchParams.get("select4") || "";

    setSelectedOptions({
      select1,
      select2,
      select3,
      select4,
    });

    setCondition(select2);
  }, [location.search]);

  const handleResultClick = (event) => {
    const queryString = `?select1=${parseInt(
      selectedOptions.select1
    )}&select2=${parseInt(selectedOptions.select2)}&select3=${parseInt(
      selectedOptions.select3
    )}&select4=${parseInt(
      selectedOptions.select4
    )}&userId=${userSessionData}&dataNum=${parseInt(event.target.value)}`;
    navigate(`/SearchResult${queryString}`);
  };

  return (
    <BackGround>
      <SearchContainer>
        <NavBar>
          <NavBarRow>
            <NavBarSelect
              value={selectedOptions.select1}
              onChange={(e) => handleSelectChange(e, "select1")}
            >
              <option value="00000">주소 입력 창 (시/군/구 선택)</option>
              <option value="11000">서울특별시 전체</option>
              <option value="11680">강남구</option>
              <option value="11740">강동구</option>
              <option value="11305">강북구</option>
              <option value="11500">강서구</option>
              <option value="11620">관악구</option>
              <option value="11215">광진구</option>
              <option value="11530">구로구</option>
              <option value="11545">금천구</option>
              <option value="11350">노원구</option>
              <option value="11320">도봉구</option>
              <option value="11230">동대문구</option>
              <option value="11590">동작구</option>
              <option value="11440">마포구</option>
              <option value="11410">서대문구</option>
              <option value="11650">서초구</option>
              <option value="11200">성동구</option>
              <option value="11290">성북구</option>
              <option value="11710">송파구</option>
              <option value="11470">양천구</option>
              <option value="11560">영등포구</option>
              <option value="11170">용산구</option>
              <option value="11380">은평구</option>
              <option value="11110">종로구</option>
              <option value="11140">중구</option>
              <option value="11260">중랑구</option>
            </NavBarSelect>
          </NavBarRow>
          <NavBarRow>
            <NavBarSelect
              value={selectedOptions.select2}
              onChange={(e) => handleSelectChange(e, "select2")}
            >
              <option value="0">조건 선택</option>
              <option value="1">가격</option>
              <option value="2">면적</option>
            </NavBarSelect>
            {condition === "0" ? (
              <NavBarSelect
                value={selectedOptions.select3}
                onChange={(e) => handleSelectChange(e, "select3")}
              >
                <option value="0">조건 세분화</option>
              </NavBarSelect>
            ) : null}
            {condition === "1" ? (
              <NavBarSelect
                value={selectedOptions.select3}
                onChange={(e) => handleSelectChange(e, "select3")}
              >
                <option value="0">조건 세분화</option>
                <option value="1">20만원 미만</option>
                <option value="2">20 ~ 40만원</option>
                <option value="3">40 ~ 60만원</option>
                <option value="4">60 ~ 80만원</option>
                <option value="5">80 ~ 100만원</option>
                <option value="6">100만원 이상</option>
              </NavBarSelect>
            ) : null}
            {condition === "2" ? (
              <NavBarSelect
                value={selectedOptions.select3}
                onChange={(e) => handleSelectChange(e, "select3")}
              >
                <option value="0">조건 세분화</option>
                <option value="1">10평 미만</option>
                <option value="2">10 ~ 20평</option>
                <option value="3">20 ~ 30평</option>
                <option value="4">30 ~ 40평</option>
                <option value="5">40 ~ 50평</option>
                <option value="6">50 ~ 60평</option>
                <option value="7">60평 이상</option>
              </NavBarSelect>
            ) : null}
            <NavBarSelect
              value={selectedOptions.select4}
              onChange={(e) => handleSelectChange(e, "select4")}
            >
              <option value="0">이동 시간 선택</option>
              <option value="10">10분 미만</option>
              <option value="20">20분 미만</option>
              <option value="30">30분 미만</option>
              <option value="40">40분 미만</option>
              <option value="50">50분 미만</option>
              <option value="60">60분 미만</option>
              <option value="70">60분 이상</option>
            </NavBarSelect>
          </NavBarRow>
          <NavBarRow>
            <NavBarConfirm onClick={handleResultConfirm}>
              선택 완료
            </NavBarConfirm>
          </NavBarRow>
          <NavBarRow>
            <NavBarSpan id="span">
              원하는 동네를 클릭해서 자세한 정보를 확인하세요!
            </NavBarSpan>
          </NavBarRow>
        </NavBar>
        <ResultGroup id="resultGroup">
          <ButtonResult
            className="result"
            value="1"
            onClick={handleResultClick}
          ></ButtonResult>
          <ButtonResult
            className="result"
            value="2"
            onClick={handleResultClick}
          ></ButtonResult>
          <ButtonResult
            className="result"
            value="3"
            onClick={handleResultClick}
          ></ButtonResult>
          <ButtonResult
            className="result"
            value="4"
            onClick={handleResultClick}
          ></ButtonResult>
        </ResultGroup>
        <NavBarRow>
          <ResultConfirm onClick={handleConfirmClick}></ResultConfirm>
        </NavBarRow>
      </SearchContainer>
    </BackGround>
  );
}

export default Search;
