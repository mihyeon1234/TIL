import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Toss from 'assets/icon/payment/payment_icon_toss.png';
import Kakao from 'assets/icon/payment/payment_icon_kakao.png';
import Credit from 'assets/icon/payment/payment_icon_credit.png';

const productId = 773;

export function getYYMMDD(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const fullDate = `${year}년 ${month}월 ${day}일`;

  return fullDate;
}

function nextPaymentDate(pay) {
  const today = new Date();
  if (pay.product.experience) {
    const twoWeeks = today.getTime() + 15 * 1000 * 60 * 60 * 24;
    return getYYMMDD(new Date(twoWeeks));
  }

  const month = today.getTime() + 31 * 1000 * 60 * 60 * 24;
  return getYYMMDD(new Date(month));
}

function todayPrice(pay) {
  if (pay.product.experience && pay.productId === productId) {
    return '0원';
  }

  return pay.product.price;
}

function checkOneTimePayment(pay) {
  if (pay.productId === productId) {
    return '구독권';
  }

  return '30일권';
}

function Index() {
  const pay = useSelector((state) => state.payment);
  const [methodBtn, setMethodBtn] = useState({
    kakao: false,
    credit: false,
    toss: false,
  });
  return (
    <Container>
      <div data-type="title">
        <span>결제 금액</span>
      </div>
      <PriceNotice>
        <div>
          <span>{checkOneTimePayment(pay)} 금액</span>
          <div>
            {pay.productId === productId && <span>매월&nbsp;</span>}
            <span>{pay.product.price}</span>
          </div>
        </div>
        <div>
          <span>오늘 결제 금액</span>
          <span>{todayPrice(pay)}</span>
        </div>
        {pay.productId === productId && (
          <div>
            <span>다음 결제</span>
            <div>
              <span data-type="highlight">{nextPaymentDate(pay)}</span>
              <span>&nbsp;({pay.product.price})</span>
            </div>
          </div>
        )}
      </PriceNotice>

      <Method>
        <div data-type="title">
          <span>결제 수단</span>
        </div>
        <div data-type="pay">
          <MethodButton
            data-type="kakao"
            data-select={methodBtn.kakao}
            onClick={() => {
              setMethodBtn({
                ...methodBtn,
                kakao: true,
                credit: false,
                toss: false,
              });
            }}
          >
            <img src={Kakao} alt="kakao" />
            <span>카카오페이</span>
          </MethodButton>
          <MethodButton
            data-type="credit"
            data-select={methodBtn.credit}
            onClick={() => {
              setMethodBtn({
                ...methodBtn,
                kakao: false,
                credit: true,
                toss: false,
              });
            }}
          >
            <img alt="credit" src={Credit} />
            <span>신용카드</span>
          </MethodButton>
          <MethodButton
            data-type="toss"
            data-select={methodBtn.toss}
            onClick={() => {
              setMethodBtn({
                ...methodBtn,
                kakao: false,
                credit: false,
                toss: true,
              });
            }}
          />
        </div>
      </Method>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;

  div[data-type='title'] {
    width: 100%;
    span {
      font-weight: bold;
      font-size: 17px;
    }
  }
`;

const PriceNotice = styled.div`
  width: 100%;
  margin-top: 10px;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid #eaeaea;

    > div {
      display: flex;
      align-items: center;
      flex-direction: row;
    }

    &:nth-child(2n-1) {
      span {
        color: #666666;
        height: 22px;
      }

      span[data-type='highlight'] {
        &::after {
          content: '';
          display: block;
          position: relative;
          height: 5px;
          background-color: rgba(255, 218, 79, 0.5);
          bottom: 5px;
        }
      }
    }
    &:nth-child(2n) {
      span {
        font-weight: bold;
        height: 22px;
      }
    }
  }
`;

const Method = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;

  div[data-type='title'] > span {
    font-weight: bold;
    font-size: 17px;
  }

  div[data-type='pay'] {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }
`;

const MethodButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 50px;
  border: 2px solid #eaeaea;
  border-radius: 10px;
  user-select: none;

  span {
    font-weight: bold;
    color: #666666;
    font-size: 11pt;
  }

  &[data-select='true'] {
    background-color: rgb(255, 218, 79);
    border: unset;

    &:hover {
      border: unset;
    }
  }

  &[data-type='kakao'] {
    display: flex;
    align-items: center;

    img {
      height: 22px;
      margin-right: 5px;
    }

    &[data-select='false']:hover {
      border: 2px solid #ffeb00;
    }
  }

  &[data-type='credit'] {
    img {
      margin-right: 5px;
    }

    &[data-select='false']:hover {
      border: 2px solid #666666;
    }
  }

  &[data-type='toss'] {
    background-image: url(${Toss});
    background-size: 70px;
    background-repeat: no-repeat;
    background-position: center;

    &[data-select='false']:hover {
      border: 2px solid #0064ff;
    }
  }

  &:not(:last-child) {
    margin-right: 15px;
  }

  &:hover {
    cursor: pointer;
  }
`;
