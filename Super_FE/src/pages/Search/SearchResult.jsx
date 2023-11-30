import React, { useState, useEffect } from "react";
import { SearchContainer, NavBar, NavBarRow, NavBarSpan, NavBarSelect, ResultGroup, ButtonReturn, ResultPara, ResultHeader, ResultDiv, ResultSpan, ResultValue, ResultConfirm } from "./NavBar";
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

    const [condition, setCondition] = useState('0');

    const handleOption = (e) => {
        setCondition(e.target.value);
    }

    return (
        <SearchContainer>
            <NavBar>
                <NavBarRow>
                    <NavBarSpan>위치를 선택하세요 : 서울특별시 </NavBarSpan>
                    <NavBarSelect>
                        <option>구 선택</option>
                        <option value='11680'>강남구</option>
                        <option value='11740'>강동구</option>
                        <option value='11305'>강북구</option>
                        <option value='11500'>강서구</option>
                        <option value='11620'>관악구</option>
                        <option value='11215'>광진구</option>
                        <option value='11530'>구로구</option>
                        <option value='11545'>금천구</option>
                        <option value='11350'>노원구</option>
                        <option value='11320'>도봉구</option>
                        <option value='11230'>동대문구</option>
                        <option value='11590'>동작구</option>
                        <option value='11440'>마포구</option>
                        <option value='11410'>서대문구</option>
                        <option value='11650'>서초구</option>
                        <option value='11200'>성동구</option>
                        <option value='11290'>성북구</option>
                        <option value='11710'>송파구</option>
                        <option value='11470'>양천구</option>
                        <option value='11560'>영등포구</option>
                        <option value='11170'>용산구</option>
                        <option value='11380'>은평구</option>
                        <option value='11110'>종로구</option>
                        <option value='11140'>중구</option>
                        <option value='11260'>중랑구</option>
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
            </NavBar>
            <ResultGroup>
                <ResultPara>
                    <ResultHeader>신내동</ResultHeader>
                    <ResultDiv>
                        <ResultSpan>평균 가격</ResultSpan>
                        <ResultValue>ABCDEF</ResultValue>
                    </ResultDiv>
                    <ResultDiv>
                        <ResultSpan>평균 면적</ResultSpan>
                        <ResultValue>ABCDEF</ResultValue>
                    </ResultDiv>
                    <ResultDiv>
                        <ResultSpan>이동 시간</ResultSpan>
                        <ResultValue>ABCDEF</ResultValue>
                    </ResultDiv>
                    <ResultDiv>
                        <ResultSpan>교통비</ResultSpan>
                        <ResultValue>ABCDEF</ResultValue>
                    </ResultDiv>
                    <ResultDiv>
                        <ResultSpan>유류비</ResultSpan>
                        <ResultValue>ABCDEF</ResultValue>
                    </ResultDiv>
                </ResultPara>
            </ResultGroup>
        <NavBarRow>
            <ResultConfirm
                    onClick={handleConfirmClick}
                    ></ResultConfirm>
            </NavBarRow>
        </SearchContainer>
    );
}

export default SearchResult;
