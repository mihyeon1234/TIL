import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function Index() {
  const user = useSelector((state) => state.user);
  return (
    <Container>
      <span data-type="name">{user.userName && user.userName}</span>
      <span>님은 현재&nbsp;</span>
      <span data-type="membership">신규셀러</span>
      <span>입니다.</span>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  max-width: 700px;
  min-width: 365px;
  height: 50px;
  span[data-type='name'] {
    font-size: 17px;
  }

  span[data-type='membership'] {
    font-size: 17px;
    font-weight: bold;
    color: #ffda4f;
  }
`;
