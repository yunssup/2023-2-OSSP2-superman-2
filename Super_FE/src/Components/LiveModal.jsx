// Modal.js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const modalStyle = {
  display: "block",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgb(255, 255, 255)",
  padding: "20px",
  zIndex: 1000,
  width: "60%",
  height: "50%",
  borderRadius: "7px",
  borderColor: "5px solid black",
};

const contentStyle = {
  marginTop: "25%",
  fontSize: "24px",
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
  padding: "5%",
  marginTop: "5%",
};

const buttonStyle = {
  padding: "16px",
  cursor: "pointer",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  color: "black",
  borderRadius: "8px",
  fontSize: "15px",
  marginTop: "65%",
};

const Modal = ({ isOpen, onClose }) => {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    const principalValue = parseFloat(principal);
    const interestRateValue = parseFloat(interestRate.replace("%", "")); // remove '%' and convert to float

    if (!isNaN(principalValue) && !isNaN(interestRateValue)) {
      setResult((principalValue * interestRateValue) / 100); // calculate percentage
    } else {
      setResult(0);
    }
  }, [principal, interestRate]);

  // Use ReactDOM.createPortal to render the modal content as a child of the body element
  return isOpen
    ? ReactDOM.createPortal(
        <div style={modalStyle}>
          <div style={contentStyle}>
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
          </div>
          <button style={buttonStyle} onClick={onClose}>
            입력 완료
          </button>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
