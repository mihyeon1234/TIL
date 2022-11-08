import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import preparing from 'assets/images/preparing.png';
import preparingBackground from 'assets/images/preparing_bg.png';

export default function PrePare() {
  return (
    <Container>
      <ImgDiv>
        <img src={preparing} alt="준비중..." />
      </ImgDiv>
      <div>
        기능 준비중입니다. 조금만 기다려주세요!
        <br />
        <Link to="/">메인 화면으로 돌아가기</Link>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100% - 350px);
  background-image: url(${preparingBackground});
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;

  img {
    display: flex;
    align-self: center;
    margin-top: 200px;
  }

  div {
    font-size: 22px;
    text-align: center;
    margin-top: 35px;

    a {
      font-size: 16px;
    }
  }
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
`;
