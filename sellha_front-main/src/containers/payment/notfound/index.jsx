import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import preparing from 'assets/images/preparing.png';
import preparingBackground from 'assets/images/preparing_bg.png';

export default function NotFound() {
  return (
    <Container>
      <ImgDiv>
        <img src={preparing} alt="notFoundImage" />
      </ImgDiv>
      <div>
        페이지를 찾을 수 없습니다.
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
