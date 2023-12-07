// Modal.js
import React, { useState, useRef, useEffect } from "react";

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
  height: "50%",
  position: "relative", // Added position relative
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

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

const instructionTextStyle = {
  marginTop: "30%", // Added margin for separation
  // fontStyle: "italic", // Added italic style
  color: "#333", // Added color
};

const buttonStyle = {
  padding: "16px",
  cursor: "pointer",
  backgroundColor: "white",
  color: "black",
  borderRadius: "8px",
  fontSize: "15px",
  marginTop: "20%",
};

const GoModal = ({ isOpen, onClose }) => {
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose(fuelEfficiency); // fuelEfficiency 값을 onClose 핸들러로 전달
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      style={{ ...modalStyle, display: isOpen ? "flex" : "none" }}
    >
      <div style={contentStyle}>
        <div style={closeButtonStyle} onClick={onClose}>
          X
        </div>
        <p style={instructionTextStyle}>연비를 입력해주세요!</p>
        <div>
          <input
            style={inputStyle}
            type="text"
            id="fuelEfficiency"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(e.target.value)}
          />
        </div>
        <button style={buttonStyle} onClick={handleClose}>
          입력 완료{" "}
        </button>
      </div>
    </div>
  );
};

export default GoModal;
