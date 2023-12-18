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
  const navigate = useNavigate();
  const [enroll_company, setEnroll_company] = useState({
    address1: "",
    address2: "",
    detailedAddress1: "",
    detailedAddress2: "",
    electricityExpense1: "",
    electricityExpense2: "",
    managementExpense1: "",
    managementExpense2: "",
    communicationExpense1: "",
    communicationExpense2: "",
  });
  // 주소 찾기 팝업
  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);
  //세션 가져오기
  const [userSessionData, setUserSessionData] = useState(null);
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get("52.78.118.198/api/user", {
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

  const handleInput = (e, fieldName) => {
    setEnroll_company((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
    console.log(`${fieldName}: ${e.target.value}`);
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
    navigate("/CompareResult");

    console.log("Show Results:", enroll_company);
    // 결과를 어떻게 보여줄지에 대한 구체적인 로직을 추가하세요.
  };

  const [transportCosts, setTransportCosts] = useState([null, null]);
  const [rent1, setRent1] = useState(null);
  const [rent2, setRent2] = useState(null);
  const [loanInterest1, setLoanInterest1] = useState(null);
  const [loanInterest2, setLoanInterest2] = useState(null);
  const [comparePrc, setComparePrc] = useState(null);

  // handleAddressInputComplete 함수에서 각 집에 대한 교통비를 업데이트합니다.
  const handleAddressInputComplete = (houseNum) => {
    const postData = {
      User: userSessionData,
      HouseNum: houseNum,
      HouseAddress: enroll_company[`address${houseNum}`],
      HouseDetail: enroll_company[`detailedAddress${houseNum}`],
    };

    console.log(`POST 데이터(${houseNum}번 집):`, postData);

    axios
      .post("52.78.118.198/api/compare", postData)
      .then((response) => {
        console.log(`데이터 전송 완료(${houseNum}번 집)`, response.data);

        // POST 요청 후, GET 요청으로 교통비 데이터 가져오기
        axios
          .get(
            `52.78.118.198/api/compare/transport/?user=${userSessionData}&house=${houseNum}`,
            {
              withCredentials: true,
            }
          )
          .then((getResponse) => {
            console.log(`교통비 응답(${houseNum}번 집):`, getResponse.data);

            // 교통비 값을 상태에 업데이트
            setTransportCosts((prevTransportCosts) => {
              const updatedTransportCosts = [...prevTransportCosts];
              updatedTransportCosts[houseNum - 1] = getResponse.data.cost;
              return updatedTransportCosts;
            });

            // 여기에서 houseInfoUrl 주소 값을 postData의 HouseAddress를 사용하여 동적으로 생성
            const houseInfoUrl = `52.78.118.198/api/compare/houseinfo?address=${encodeURIComponent(
              postData.HouseAddress
            )}&user=${encodeURIComponent(userSessionData)}`;

            axios
              .get(houseInfoUrl, { withCredentials: true })
              .then((houseInfoResponse) => {
                console.log(
                  `매물 정보 응답(${houseNum}번 집):`,
                  houseInfoResponse.data
                );

                // 여기에서 houseInfoResponse.data를 이용하여 화면에 필요한 정보를 출력하는 로직을 추가할 수 있습니다.
                const houseInfo = houseInfoResponse.data.houseInfo;

                console.log(`매물 정보(${houseNum}번 집):`, houseInfo);
                setRent1(houseNum === 1 ? houseInfo.prc : rent1);
                setRent2(houseNum === 2 ? houseInfo.prc : rent2);
                setLoanInterest1(
                  houseNum === 1 ? houseInfo.대출이자 : loanInterest1
                );
                setLoanInterest2(
                  houseNum === 2 ? houseInfo.대출이자 : loanInterest2
                );
                setComparePrc(houseInfo.compare_prc);

                // 입력된 값도 구분하여 출력
                console.log(`입력된 값(${houseNum}번 집):`, {
                  electricityExpense:
                    enroll_company[`electricityExpense${houseNum}`],
                  managementExpense:
                    enroll_company[`managementExpense${houseNum}`],
                  communicationExpense:
                    enroll_company[`communicationExpense${houseNum}`],
                });
              })

              .catch((houseInfoError) => {
                console.error("매물 정보 가져오기 실패", houseInfoError);
              });
          })
          .catch((getError) => {
            console.error("교통비 가져오기 실패", getError);
          });
      })
      .catch((error) => {
        console.error("데이터 전송 실패", error);
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
          보증금
          <br />
          {rent1 !== null ? rent1 : " "}
          <br />
          대출이자
          <br />
          {loanInterest1 !== null ? loanInterest1 : " "}
          <br />
          교통비
          <br /> {transportCosts[0] !== null ? `${transportCosts[0]}원` : " "}
        </InsideContainer>
        <InsideContainer>
          보증금
          <br />
          {rent2 !== null ? rent2 : " "}
          <br />
          대출이자
          <br />
          {loanInterest2 !== null ? loanInterest2 : " "}
          <br />
          교통비
          <br />
          {transportCosts[1] !== null ? `${transportCosts[1]}원` : " "}
        </InsideContainer>
      </RowContainer>
      <Title>↓ 직접 입력해주세요 ↓</Title>
      <RowContainer>
        <InsideContainerResult>
          <InputWithBorder
            placeholder="전기세"
            type="number"
            required={true}
            name="electricityExpense1"
            onChange={(e) => handleInput(e, "electricityExpense1")}
            value={enroll_company.electricityExpense1}
          />
          <InputWithBorder
            placeholder="관리비"
            type="number"
            required={true}
            name="managementExpense1"
            onChange={(e) => handleInput(e, "managementExpense1")}
            value={enroll_company.managementExpense1}
          />
          <InputWithBorder
            placeholder="통신비"
            type="number"
            required={true}
            name="communicationExpense1"
            onChange={(e) => handleInput(e, "communicationExpense1")}
            value={enroll_company.communicationExpense1}
          />
        </InsideContainerResult>

        <InsideContainerResult>
          <InputWithBorder
            placeholder="전기세"
            type="number"
            required={true}
            name="electricityExpense2"
            onChange={(e) => handleInput(e, "electricityExpense2")}
            value={enroll_company.electricityExpense2}
          />
          <InputWithBorder
            placeholder="관리비"
            type="number"
            required={true}
            name="managementExpense2"
            onChange={(e) => handleInput(e, "managementExpense2")}
            value={enroll_company.managementExpense2}
          />
          <InputWithBorder
            placeholder="통신비"
            type="number"
            required={true}
            name="communicationExpense2"
            onChange={(e) => handleInput(e, "communicationExpense2")}
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
