// Modal.js
import React, { useState } from "react";

const modalStyle = {
  display: "block", // 초기에 모달이 보이도록 설정
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgb(255, 232, 224)",
  padding: "20px",
  zIndex: 1000,
  width: "60%",
  height: "50%",
  borderRadius: "7px",
};

const contentStyle = {
  // border: "1px solid red",
  marginTop: "50%",
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  borderRadius: "11px",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "8px",
  cursor: "pointer",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  marginTop: "10%",
};

const Modal = ({ isOpen, onClose }) => {
  const [fuelEfficiency, setFuelEfficiency] = useState("");

  return (
    <div style={{ ...modalStyle, display: isOpen ? "block" : "none" }}>
      <div style={contentStyle}>
        <p>연비를 입력해주세요!</p>
        <div>
          <input
            style={inputStyle}
            type="text"
            id="fuelEfficiency"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(e.target.value)}
          />
        </div>
      </div>
      <button style={buttonStyle} onClick={onClose}>
        입력 완료{" "}
      </button>
    </div>
  );
};

export default Modal;
