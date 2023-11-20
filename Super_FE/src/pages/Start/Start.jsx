// Start.js

import React, { useEffect } from "react";
import { Container, Title, BackGround } from "./Style";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // 3초 뒤에 "/nextpage"로 이동
      navigate("/First");
    }, 3000);

    // 컴포넌트가 언마운트 되면 타이머 클리어
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <BackGround>
      <Container>
        <Title>어디살까?</Title>
      </Container>
    </BackGround>
  );
}

export default Start;
