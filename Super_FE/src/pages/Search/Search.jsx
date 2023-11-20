import React, { useState, useEffect } from "react";
import {
  SearchContainer,
  NavBar,
  NavBarRow,
  NavBarSelect,
  ResultGroup,
  ButtonReturn,
  ButtonOrder,
  ButtonResult,
  AddressSearchContainer,
  AddressContainer,
  UserEnrollText,
  FindButton,
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
    } else {
      buttonOrder.textContent = "평균 면적 크기 순 ↑";
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

  const [enroll_company, setEnroll_company] = useState({
    address1: "",
  });

  const [popup1, setPopup1] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
    console.log(`${e.target.name}: ${e.target.value}`);
  };
  const handleComplete = (field, data) => {
    if (field === "address1") {
      setPopup1(true);
    } else if (field === "address2") {
      setPopup2(true);
    }

    // 우편번호 찾기를 통해 받은 데이터로 입력창을 업데이트합니다.
    setEnroll_company({
      ...enroll_company,
      [field]: data.address, // 예시로 주소를 넣었으니 필요에 따라 수정
    });
    console.log(data);
  };
  const handleClose = (field) => {
    if (field === "address1") {
      setPopup1(false);
    } else if (field === "address2") {
      setPopup2(false);
    }
  };

  return (
    <SearchContainer>
      <NavBar>
        <AddressContainer>
          <UserEnrollText
            placeholder="주소 찾기 클릭!"
            type="text"
            required={true}
            name="address1"
            onChange={handleInput}
            value={enroll_company.address1}
          />
          <FindButton onClick={() => handleComplete("address1")}>
            주소 찾기
          </FindButton>
          {popup1 && (
            <Post
              company={enroll_company}
              setcompany={setEnroll_company}
              onComplete={(data) => handleComplete("address1", data)}
              onClose={() => handleClose("address1")}
            />
          )}
        </AddressContainer>
        <NavBarRow>
          <NavBarSelect>
            <option>조건 선택</option>
            <option>가격</option>
            <option>면적</option>
          </NavBarSelect>
          <NavBarSelect>
            <option>조건 세분화</option>
          </NavBarSelect>
          <NavBarSelect>
            <option>OO분 이내</option>
          </NavBarSelect>
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
