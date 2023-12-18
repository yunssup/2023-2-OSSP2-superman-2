import React, { useState, useEffect } from "react";
import { BackGround, SearchContainer, NavBar, NavBarRow, NavBarSpan, NavBarSelect, ResultGroup, ButtonReturn, ResultPara, ResultHeader, ResultDiv, ResultSpan, ResultValue, ResultConfirm } from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SearchResult(){

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedOptions, setSelectedOptions] = useState({
        select1: '',
        select2: '',
        select3: '',
        select4: '',
        userId: '',
        dataNum: ''
    });

    const handleSelectChange = (event, selectNumber) => {
       const {value}=event.target;
       console.log(value);
       setSelectedOptions({
        ...selectedOptions,
       [selectNumber]: value
      });

      if(selectNumber === 'select2'){
        setCondition(value);
      }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const select1 = searchParams.get('select1') || ''; //전달받은 select 설정
        const select2 = searchParams.get('select2') || '';
        const select3 = searchParams.get('select3') || '';
        const select4 = searchParams.get('select4') || '';
        const userId = searchParams.get('userId') || '';
        const dataNum = searchParams.get('dataNum') || '';

        setSelectedOptions({
            select1,
            select2,
            select3,
            select4,
            userId,
            dataNum
        });

        axios.get(`http://localhost:8080/api/region?userid=${userId}&regionid=${parseInt(selectedOptions.select1)}&condition=${parseInt(selectedOptions.select2)}&range=${parseInt(selectedOptions.select3)}&maxtraval=${parseInt(selectedOptions.select4)}`)
        .then(response => {
            const data = response.data;
            document.querySelector('#resultPlace').innerHTML = data[dataNum - 1][dataNum].place;
            document.querySelector('#resultArea').innerHTML = data[dataNum - 1][dataNum].area;
            document.querySelector('#resultCost').innerHTML = data[dataNum - 1][dataNum].cost;
            document.querySelector('#resultTime').innerHTML = data[dataNum - 1][dataNum].time;
            document.querySelector('#resultTransportCost').innerHTML = data[dataNum - 1][dataNum].transportcost;
            console.log(data);
        })
          .catch(error => {
            console.error("에러 발생", error);
        });
    
    }, [location.search]);

    const handleReturnClick = () => {
        const queryString = `?select1=${selectedOptions.select1}&select2=${selectedOptions.select2}&select3=${selectedOptions.select3}&select2=${selectedOptions.select2}&select4=${selectedOptions.select4}`;
        navigate(`/Search${queryString}`);
    };

    const handleConfirmClick = () => {
        navigate("/main");
    };

    const [condition, setCondition] = useState('0');

    return (
        <BackGround>
            <SearchContainer>
                <NavBar>
                    <NavBarRow>
                        <NavBarSelect value={selectedOptions.select1} onChange={(e) => handleSelectChange(e, 'select1')}>
                            <option>주소 입력 창 (시/군/구 선택)</option>
                            <option value='11000'>서울특별시 전체</option>
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
                    <NavBarSelect value={selectedOptions.select2} onChange={(e) => handleSelectChange(e, 'select2')}>
                        <option value='0'>조건 선택</option>
                        <option value='1'>가격</option>
                        <option value='2'>면적</option>
                    </NavBarSelect>
                    {condition==='0'?
                        <NavBarSelect value={selectedOptions.select3} onChange={(e) => handleSelectChange(e, 'select3')}>
                            <option value='0'>조건 세분화</option>
                        </NavBarSelect>
                        :null}
                    {condition==='1'?
                        <NavBarSelect value={selectedOptions.select3} onChange={(e) => handleSelectChange(e, 'select3')}>
                            <option value='0'>조건 세분화</option>
                            <option value='1'>20만원 미만</option>
                            <option value='2'>20 ~ 40만원</option>
                            <option value='3'>40 ~ 60만원</option>
                            <option value='4'>60 ~ 80만원</option>
                            <option value='5'>80 ~ 100만원</option>
                            <option value='6'>100만원 이상</option>
                        </NavBarSelect>
                        :null}
                    {condition==='2'?
                        <NavBarSelect value={selectedOptions.select3} onChange={(e) => handleSelectChange(e, 'select3')}>
                            <option value='0'>조건 세분화</option>
                            <option value='1'>10평 미만</option>
                            <option value='2'>10 ~ 20평</option>
                            <option value='3'>20 ~ 30평</option>
                            <option value='4'>30 ~ 40평</option>
                            <option value='5'>40 ~ 50평</option>
                            <option value='6'>50 ~ 60평</option>
                            <option value='7'>60평 이상</option>
                        </NavBarSelect>
                        :null}
                    <NavBarSelect value={selectedOptions.select4} onChange={(e) => handleSelectChange(e, 'select4')}>
                        <option value='0'>이동 시간 선택</option>
                        <option value='10'>10분 미만</option>
                        <option value='20'>20분 미만</option>
                        <option value='30'>30분 미만</option>
                        <option value='40'>40분 미만</option>
                        <option value='50'>50분 미만</option>
                        <option value='60'>60분 미만</option>
                        <option value='70'>60분 이상</option>
                    </NavBarSelect>
                </NavBarRow>
                </NavBar>
                <ResultGroup>
                    <ResultPara>
                        <ResultHeader id='resultPlace'></ResultHeader>
                        <ButtonReturn
                            onClick={handleReturnClick}
                        ></ButtonReturn>
                        <ResultDiv>
                            <ResultSpan>평균 가격</ResultSpan>
                            <ResultValue id='resultCost'></ResultValue>
                        </ResultDiv>
                        <ResultDiv>
                            <ResultSpan>평균 면적</ResultSpan>
                            <ResultValue id='resultArea'></ResultValue>
                        </ResultDiv>
                        <ResultDiv>
                            <ResultSpan>이동 시간</ResultSpan>
                            <ResultValue id='resultTime'></ResultValue>
                        </ResultDiv>
                        <ResultDiv>
                            <ResultSpan>교통비</ResultSpan>
                            <ResultValue id='resultTransportCost'></ResultValue>
                        </ResultDiv>
                    </ResultPara>
                </ResultGroup>
                <NavBarRow>
                    <ResultConfirm
                        src="public/start/home.png" // Replace this with the actual path or URL of your image
                        alt="Result Image"
                        onClick={handleConfirmClick}
                    ></ResultConfirm>
                </NavBarRow>
            </SearchContainer>
        </BackGround>
    );
}

export default SearchResult;
