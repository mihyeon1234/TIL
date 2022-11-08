import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SellhaLogo from 'assets/images/sellha-full-logo.png';

function index() {
  return (
    <>
      <IntroDiv>똑똑한 셀러들이 찾는 아이템 분석 플랫폼</IntroDiv>
      <Link to="/">
        <img src={SellhaLogo} alt="셀링하니" width="230px" />
      </Link>
    </>
  );
}

export default index;

const IntroDiv = styled.div`
  margin: 0.5em 1em;
  width: fit-content;
  font-size: 0.8rem;
`;
