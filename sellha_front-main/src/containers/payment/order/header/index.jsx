import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BackIcon from 'assets/icon/btn_arrow_left.png';

function Index() {
  const history = useHistory();
  const pay = useSelector((state) => state.payment);

  return (
    <Container>
      <input type="button" onClick={() => history.push('/payment')} />
      <span>{pay.productId === 773 ? '구독권 결제' : '30일권 결제'}</span>
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
  height: 70px;
  border-bottom: 1px solid #eaeaea;

  input[type='button'] {
    width: 18px;
    height: 18px;
    margin-right: 15px;
    background-image: url(${BackIcon});
    background-size: contain;
    background-color: unset;
    background-position: center;
    background-repeat: no-repeat;

    &:hover {
      cursor: pointer;
      background-color: unset;
    }
  }

  span {
    font-size: 20px;
    font-weight: bold;
  }
`;
