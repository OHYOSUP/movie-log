import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <p>
        <StyledLink to="/">
          BOX OFFICE
        </StyledLink>
      </p>
      <p>
        <StyledLink to="/search">찾기</StyledLink>
      </p>
      <p>
        <StyledLink to="/mypage">MY LOG</StyledLink>
      </p>
    </>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default Nav;
