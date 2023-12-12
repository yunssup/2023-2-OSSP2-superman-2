import React, { useState, useEffect } from "react";
import {
  BackGround,
  AddressSearchContainer,
  UserEnrollText,
  AddressContainer,
  FindButton,
  InsideContainer,
  RowContainer,
  InsideContainerResult,
  Title,
  ButtonGo,
  InputWithBorder,
  IMGHOME,
  AddressContainerInput,
  AddressContainerInputContainer,
  UserEnrollTextInput,
  ButtonHouse,
} from "./Style";
import Post from "../../Components/Post";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Compare() {
  const navigate = useNavigate(); // 페이지 이동 함수

  const [enroll_company, setEnroll_company] = useState({
    address1: "",
    address2: "",
    detailedAddress1: "",
    detailedAddress2: "",
    electricityExpense: "",
    managementExpense: "",
    communicationExpense: "",
    electricityExpense2: "",
    managementExpense2: "",
    communicationExpense2: "",
  });
  // 주소 찾기 관련 로직
  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);
  //세션 가져오기
  const [userSessionData, setUserSessionData] = useState(null);
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

    setEnroll_company({
      ...enroll_company,
      [field]: data.address,
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

  const handleShowResults = () => {
    console.log("Show Results:", enroll_company);
    // 결과를 어떻게 보여줄지에 대한 구체적인 로직을 추가하세요.
  };
  // 1번 주소 입려 클릭 할 때 백엔드에게 post로 넘어가는 부분
  const handleAddressInputComplete = (houseNum) => {
    const postData = {
      User: userSessionData,
      HouseNum: houseNum, // 수정: houseNum으로 변경
      HouseAddress: enroll_company[`address${houseNum}`],
      HouseDetail: enroll_company[`detailedAddress${houseNum}`],
    };

    console.log("POST 데이터:", postData); // 백엔드에게 post한 값 콘솔 출력

    axios
      .post("http://localhost:8080/api/compare", postData)
      .then((response) => {
        console.log("데이터 전송 완료", response.data);
      })
      .catch((error) => {
        // 오류가 발생했을 때 처리하는 부분
        console.error("데이터 전송 실패패", error);
      });

      // 입력 완료 버튼을 눌렀을 때 주소에 대한 매물 정보 요청
      const add = { User: userSessionData, address : enroll_company[`address${houseNum}`]}
      axios
      .post("http://localhost:8080/api/compare/houseinfo", add)
      .then((response) => {
        console.log("반환 데이터", response.data);
        // 해당 부분에서 화면 월세, 보증금, 대출이자, 교통비 데이터 출력 로직 필요
      })
      .catch((error) => {
        // 오류가 발생했을 때 처리하는 부분
        console.error("데이터 전송 실패패", error);
      });

  };
  // 하단 홈 버튼 클릭 시 메인 화면으로 복귀
  const handleImageClick = () => {
    navigate("/main");
  };

  return (
    <BackGround>
      <AddressSearchContainer>
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
        <AddressContainer>
          <UserEnrollText
            placeholder="주소 찾기 클릭!"
            type="text"
            required={true}
            name="address2"
            onChange={handleInput}
            value={enroll_company.address2}
          />
          <FindButton onClick={() => handleComplete("address2")}>
            주소 찾기
          </FindButton>
          {popup2 && (
            <Post
              company={enroll_company}
              setcompany={setEnroll_company}
              onComplete={(data) => handleComplete("address2", data)}
              onClose={() => handleClose("address2")}
            />
          )}
        </AddressContainer>
      </AddressSearchContainer>
      <AddressContainerInputContainer>
        <AddressContainerInput>
          <UserEnrollTextInput
            placeholder="상세 주소 입력"
            type="text"
            required={true}
            name="detailedAddress1" // 각각 다른 name으로 설정
            onChange={handleInput}
            value={enroll_company.detailedAddress1} // 상태값도 각각 다른 상태값으로 설정
          />
        </AddressContainerInput>
        <AddressContainerInput>
          <UserEnrollTextInput
            placeholder="상세 주소 입력"
            type="text"
            required={true}
            name="detailedAddress2" // 각각 다른 name으로 설정
            onChange={handleInput}
            value={enroll_company.detailedAddress2} // 상태값도 각각 다른 상태값으로 설정
          />
        </AddressContainerInput>
      </AddressContainerInputContainer>{" "}
      <AddressContainerInputContainer>
        <ButtonHouse onClick={() => handleAddressInputComplete(1)}>
          1번 집 입력 완료!
        </ButtonHouse>
        <ButtonHouse onClick={() => handleAddressInputComplete(2)}>
          2번 집 입력 완료!
        </ButtonHouse>
      </AddressContainerInputContainer>
      <RowContainer>
        <InsideContainer>
          월세
          <br />
          값 불러올 자리
          <br />
          대출이자
          <br />
          값 불러올 자리
          <br />
          교통비
          <br />값 불러올 자리
        </InsideContainer>
        <InsideContainer>
          월세
          <br />
          값 불러올 자리
          <br />
          대출이자
          <br />
          값 불러올 자리
          <br />
          교통비
          <br />값 불러올 자리
        </InsideContainer>
      </RowContainer>
      <Title>↓ 직접 입력해주세요 ↓</Title>
      <RowContainer>
        <InsideContainerResult>
          <InputWithBorder
            placeholder="전기세"
            type="text"
            required={true}
            name="전기세"
            onChange={handleInput}
            value={enroll_company.electricityExpense}
          />
          <InputWithBorder
            placeholder="관리비"
            type="text"
            required={true}
            name="관리비"
            onChange={handleInput}
            value={enroll_company.managementExpense}
          />
          <InputWithBorder
            placeholder="통신비"
            type="text"
            required={true}
            name="통신비"
            onChange={handleInput}
            value={enroll_company.communicationExpense}
          />
        </InsideContainerResult>

        <InsideContainerResult>
          <InputWithBorder
            placeholder="전기세"
            type="text"
            required={true}
            name="electricityExpense2"
            onChange={handleInput}
            value={enroll_company.electricityExpense2}
          />
          <InputWithBorder
            placeholder="관리비"
            type="text"
            required={true}
            name="managementExpense2"
            onChange={handleInput}
            value={enroll_company.managementExpense2}
          />
          <InputWithBorder
            placeholder="통신비"
            type="text"
            required={true}
            name="communicationExpense2"
            onChange={handleInput}
            value={enroll_company.communicationExpense2}
          />
        </InsideContainerResult>
      </RowContainer>
      <ButtonGo onClick={handleShowResults}>결과 보기</ButtonGo>
      <IMGHOME
        src="public/start/home.png" // Replace this with the actual path or URL of your image
        alt="Result Image"
        onClick={handleImageClick}
      />
    </BackGround>
  );
}

export default Compare;
