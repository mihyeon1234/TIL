import React from 'react';
import styled from 'styled-components';
import { FindInfo } from '../../../style/index';

function index() {
  return (
    <Container>
      <FindInfo>
        <span>휴대폰 본인인증을 통해</span>
        <span>이메일(아이디)을 확인합니다.</span>
      </FindInfo>
    </Container>
  );
}

export default index;

const Container = styled.div`
  height: 9.5em;
`;
