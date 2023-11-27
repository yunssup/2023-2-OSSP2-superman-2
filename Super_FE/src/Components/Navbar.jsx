// NavigationBar.jsx
import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  background-color: #333; /* 네비게이션바 배경색 */
  overflow: hidden;
`;

const NavItem = styled.a`
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
`;

const NavigationBar = () => {
  return (
    <NavbarContainer>
      <NavItem href="#">Home</NavItem>
      <NavItem href="#">About</NavItem>
      <NavItem href="#">Contact</NavItem>
      {/* 필요에 따라 추가적인 네비게이션 메뉴를 작성할 수 있습니다. */}
    </NavbarContainer>
  );
};

export default NavigationBar;
