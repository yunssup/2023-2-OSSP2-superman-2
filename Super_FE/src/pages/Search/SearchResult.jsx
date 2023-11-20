import React, { useState, useEffect } from "react";
import { SearchContainer, NavBar, NavBarRow, NavBarSelect, ResultGroup, ButtonReturn, ResultPara, ResultHeader, ResultSpan, ResultConfirm } from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResult(){
    const [orderSelected, setOrderSelected] = useState(false); // 오름차순/내림차순
    
    const navigate = useNavigate();
    const location = useLocation();
    const info = {...location.state};

    const handleReturnClick = () => {
        navigate("/Search");
    };

    const handleConfirmClick = () => {
        navigate("/Search");
    };

    return (
        <SearchContainer>
            <NavBar>
                <ButtonReturn
                    onClick={handleReturnClick}
                    >
                        ←
                    </ButtonReturn>
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
            </NavBar>
            <ResultGroup>
                <ResultPara>
                    <ResultHeader>신내동</ResultHeader>
                    <ResultSpan>평균 가격</ResultSpan>
                    <ResultSpan>평균 면적</ResultSpan>
                    <ResultSpan>이동 시간</ResultSpan>
                    <ResultSpan>교통비</ResultSpan>
                    <ResultSpan>유류비</ResultSpan>
                    <ResultConfirm
                    onClick={handleConfirmClick}
                    >선택하기</ResultConfirm>
                </ResultPara>
            </ResultGroup>
        </SearchContainer>
    );
}

export default SearchResult;
