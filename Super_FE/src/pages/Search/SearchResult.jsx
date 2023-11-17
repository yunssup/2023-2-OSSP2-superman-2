import React, { useState, useEffect } from "react";
import { SearchContainer, NavBar, NavBarRow, NavBarSelect, ResultGroup, ButtonReturn, ButtonOrder, ButtonResult } from "./NavBar";
import { useNavigate } from "react-router-dom";

function SearchResult(){
    const [orderSelected, setOrderSelected] = useState(false); // 오름차순/내림차순
    
    const navigate = useNavigate();
    const handleReturnClick = () => {
        navigate("/Search");
    };
    
    const handleOrderClick = () => {
        const buttonOrder = document.getElementById("order");
        if(buttonOrder.textContent === "평균 면적 크기 순 ↑") {
            buttonOrder.textContent = "평균 면적 크기 순 ↓";
            //정렬 순서 바꾸기
        } else {
            buttonOrder.textContent = "평균 면적 크기 순 ↑";
        }
        setOrderSelected(!orderSelected);  
    };

    return (
        <SearchContainer>
            <NavBar>
                <ButtonReturn
                onClick={handleReturnClick}
                >
                    ⌂
                </ButtonReturn>
                <NavBarRow>
                    <NavBarSelect
                    id = 'address'
                    >
                    <option>주소 입력</option>
                    </NavBarSelect>
                </NavBarRow>
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
                    <ButtonOrder
                    id = "order"
                    onClick = {handleOrderClick}
                    >
                        평균 면적 크기 순 ↓</ButtonOrder>
                </NavBarRow>
            </NavBar>
            <ResultGroup>
                
            </ResultGroup>
        </SearchContainer>
    );
}

export default SearchResult;