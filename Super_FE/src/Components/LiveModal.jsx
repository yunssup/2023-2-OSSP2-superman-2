// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose }) => {
  return (
    // 모달 내용은 여기에 들어갑니다
    <div style={{ display: isOpen ? "block" : "none" }}>
      <p>모달 내용이 여기에 들어갑니다.</p>
      <button onClick={onClose}>모달 닫기</button>
    </div>
  );
};

export default Modal;
