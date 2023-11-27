import React, { useState, useEffect } from "react";
import {
  SearchContainer,
  NavBar,
  NavBarRow,
  NavBarSelect,
  NavBarConfirm,
  ResultGroup,
  ButtonReturn,
  ButtonOrder,
  ButtonResult,
} from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../Components/Post";

function Search() {
  const [orderSelected, setOrderSelected] = useState(false); // 오름차순/내림차순

  const navigate = useNavigate();
  const location = useLocation();
  const info = { ...location.state };

  const handleReturnClick = () => {
    navigate("/First");
  };

  const handleOrderClick = () => {
    const buttonOrder = document.getElementById("order");
    if (buttonOrder.textContent === "평균 면적 크기 순 ↑") {
      buttonOrder.textContent = "평균 면적 크기 순 ↓";
      //정렬 순서 바꾸기
    } else if (buttonOrder.textContent === "평균 면적 크기 순 ↓") {
      buttonOrder.textContent = "평균 면적 크기 순 ↑";
    } else if (buttonOrder.textContent === "평균 가격 순 ↑") {
      buttonOrder.textContent = "평균 가격 순 ↓"
    } else if(buttonOrder.textContent === "평균 가격 순 ↓") {
      buttonOrder.textContent = "평균 가격 순 ↑"
    }
    setOrderSelected(!orderSelected);
  };

  const handleResultClick = ({ item }) => {
    navigate(
      "/SearchResult" /*, {
            state: {
                navbarAddress: `${item.address}`,
                navBarSelect: `${item.select}`,
                navBarOrder: `${item.order}`,
            },
        } */
    );
  };

  const [condition, setCondition] = useState('0');

  const handleOption = (e) => {
    setCondition(e.target.value);
    console.log(condition);
    const buttonOrder = document.getElementById("order");
    if (condition==='1') buttonOrder.textContent = "평균 면적 크기 순 ↓";
    else if (condition==='0' || condition==='2') buttonOrder.textContent = "평균 가격 순 ↓";
  }

  return (
    <SearchContainer>
      <NavBar>
        <NavBarRow>
          <NavBarSelect>
            <option>시/도</option>
          </NavBarSelect>
          <NavBarSelect>
            <option>군</option>
          </NavBarSelect>
          <NavBarSelect>
            <option>구</option>
          </NavBarSelect>
        </NavBarRow>
        <NavBarRow>
          <NavBarSelect onChange={handleOption}>
            <option value='0'>조건 선택</option>
            <option value='1'>가격</option>
            <option value='2'>면적</option>
          </NavBarSelect>
          {condition==='0'?
          <NavBarSelect>
            <option>조건 세분화</option>
          </NavBarSelect>
          :null}
          {condition==='1'?
          <NavBarSelect>
            <option>조건 세분화</option>
            <option>20만원 미만</option>
            <option>20 ~ 40만원</option>
            <option>40 ~ 60만원</option>
            <option>60 ~ 80만원</option>
            <option>80 ~ 100만원</option>
            <option>100만원 이상</option>
          </NavBarSelect>
          :null}
          {condition==='2'?
          <NavBarSelect>
            <option>조건 세분화</option>
            <option>10평 미만</option>
            <option>10 ~ 20평</option>
            <option>20 ~ 30평</option>
            <option>30 ~ 40평</option>
            <option>40 ~ 50평</option>
            <option>50 ~ 60평</option>
            <option>60평 이상</option>
          </NavBarSelect>
          :null}
          <NavBarSelect>
            <option>이동 시간 선택</option>
            <option>~10분</option>
            <option>11분 ~ 20분</option>
            <option>21분 ~ 30분</option>
            <option>31분 ~ 40분</option>
            <option>41분 ~ 50분</option>
            <option>51분 ~ 60분</option>
            <option>60분 초과</option>
          </NavBarSelect>
        </NavBarRow>
        <NavBarRow>
          <NavBarConfirm>선택 완료</NavBarConfirm>
        </NavBarRow>
        <NavBarRow>
          <ButtonOrder id="order" onClick={handleOrderClick}>
            평균 면적 크기 순 ↓
          </ButtonOrder>
        </NavBarRow>
      </NavBar>
      <ResultGroup>
        <ButtonResult onClick={handleResultClick}>신내동</ButtonResult>
        <ButtonResult onClick={handleResultClick}>공릉동</ButtonResult>
        <ButtonResult onClick={handleResultClick}>장충동</ButtonResult>
        <ButtonResult onClick={handleResultClick}>필동</ButtonResult>
      </ResultGroup>
    </SearchContainer>
  );
}

export default Search;
