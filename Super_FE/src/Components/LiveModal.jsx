// Modal.js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const modalStyle = {
  background: "rgba(0, 0, 0, 0.25)",
  position: "fixed",
  left: "0",
  top: "0",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "100",
};

const contentStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  height: "55%",
  position: "relative",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  borderRadius: "11px",
  fontSize: "14px",
  marginTop: "10px",
};

const buttonStyle = {
  padding: "16px",
  cursor: "pointer",
  backgroundColor: "white",
  color: "black",
  borderRadius: "8px",
  fontSize: "15px",
  position: "absolute",
  bottom: "10px", // Adjusted position
  left: "50%",
  transform: "translateX(-50%)",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

const Modal = ({ isOpen, onClose }) => {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    const principalValue = parseFloat(principal);
    const interestRateValue = parseFloat(interestRate.replace("%", ""));

    if (!isNaN(principalValue) && !isNaN(interestRateValue)) {
      setResult((principalValue * interestRateValue) / 100);
    } else {
      setResult(0);
    }
  }, [principal, interestRate]);

  return isOpen
    ? ReactDOM.createPortal(
        <div style={modalStyle}>
          <div style={contentStyle}>
            <div style={closeButtonStyle} onClick={onClose}>
              X
            </div>
            <p>
              원금과 이자율을
              <br />
              입력해주세요!
            </p>
            <div>
              <input
                style={inputStyle}
                type="text"
                id="principal"
                placeholder="원금"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>
            <div>
              <input
                style={inputStyle}
                type="text"
                id="interestRate"
                placeholder="이자율 (%)"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <p>계산 결과: {result.toFixed(2)}원</p>
            <button style={buttonStyle} onClick={onClose}>
              입력 완료
            </button>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
