import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function checkOneTimePayment(pay, payStore) {
  if (pay.productId === payStore.stepPayPid[0]) {
    return [
      '체험기간 종료 후 정기결제가 시작되며, 언제든지 구독을 해지할 수 있습니다.',
      '구독권',
    ];
  }

  return [
    `${pay.product.title}를 30일 동안 이용해 보실 수 있습니다.`,
    '30일권',
  ];
}

function Index() {
  const pay = useSelector((state) => state.payment);
  const payStore = useSelector((state) => state.payment);
  const content = checkOneTimePayment(pay, payStore);
  const history = useHistory();
  useEffect(() => {
    if (!pay.product) {
      history.push('/payment');
    }
  }, []);
  return (
    <Container>
      <div data-type="notice">
        <span>{content[0]}</span>
      </div>
      <div data-type="product">
        <div>
          <span data-type="highlight">{pay.product.title}</span>
          <span>&nbsp;{content[1]}</span>
        </div>
        <div>
          <span data-type="highlight">{pay.product.price}</span>
        </div>
      </div>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  width: 100%;
  margin-top: 30px;

  div[data-type='notice'] {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: rgba(255, 218, 79, 0.5);

    @media ${(props) => props.theme.mobile} {
      background-color: unset;
      margin-bottom: 15px;
    }

    span {
      color: rgba(0, 0, 0, 0.5);
      font-weight: bold;
    }
  }

  div[data-type='product'] {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding: 0 5%;
    border: 1px solid rgba(255, 218, 79, 0.5);

    div {
      display: flex;
      flex-direction: row;
      align-items: center;

      span[data-type='highlight'] {
        font-size: 25px;
        font-weight: bold;
      }
    }
  }
`;
