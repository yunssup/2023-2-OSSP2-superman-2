// Post.jsx
import React from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const PostModal = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 600;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

const Post = (props) => {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.setcompany({
      ...props.company,
      address: fullAddress,
    });

    props.onComplete(data); // 상위 컴포넌트에 데이터 전달
    props.onClose(); // 모달을 닫습니다.
  };

  return (
    <PostModal onClick={props.onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <DaumPostcode autoClose onComplete={complete} />
      </ModalContent>
    </PostModal>
  );
};

export default Post;
