import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SweetAlert from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getPayId,
  changePayment,
  completePayment,
  cancelPayment,
} from '../../api';

import { setData } from '../../reducer';

function getButtonText(lid, pay, payStore) {
  if (pay) {
    if (pay.planId === lid) {
      return payStore.buttonText[2];
    }

    return payStore.buttonText[1];
  }

  if (lid === payStore.productData[0].lid[0]) {
    return payStore.buttonText[3];
  }

  return payStore.buttonText[0];
}

export async function popupPay(plId, prId, dispatch, history, data, pay) {
  SweetAlert.fire({
    text: '결제 시스템 준비 중입니다.',
    confirmButtonText: '확인',
    confirmButtonColor: '#FFDA4F',
  });

  if (!pay) return;
  if (pay) {
    const result = await changePayment({ pid: prId, lid: plId });

    if (result.result) {
      dispatch(
        setData({
          planId: plId,
          productId: prId,
          orderId: result.result,
          product: data,
        }),
      );

      history.push('/payment/order');
    }
  } else {
    const result = await getPayId({ pid: prId, lid: plId });

    if (result.result) {
      dispatch(
        setData({
          planId: plId,
          productId: prId,
          orderId: result.result,
          product: data,
        }),
      );

      history.push('/payment/order');
    }
  }
}

export async function cancelPay(history) {
  const result = await cancelPayment();

  if (result.message === 'ok') {
    history.push('/payment');

    SweetAlert.fire({
      title: '구독 해지 예약 완료',
      text: '해지 예약 되었습니다. 남은 기간 동안 셀하를 이용하실 수 있습니다. 감사합니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#FFDA4F',
      icon: 'success',
    });
  }
}

function ProductItem({ user, dispatch, history, pay, payStore }) {
  /**
   * 사용자 정보 없으면 로그인페이지로 이동,
   * 사용자 정보 있으면 구독 또는 구독 해지
   * 작성자: 장다영
   * 업데이트: 2021.10.27
   */
  function itemClickEvent(data) {
    if (!user.id) {
      window.scrollTo(0, 0);
      history.push('/member/login');
    } else {
      if (pay && data.lid[0] === pay.planId) {
        SweetAlert.fire({
          title: '구독 해지 예약',
          text: '지금 해지하셔도 남은 이용기간 동안은 셀하를 사용하실 수 있습니다. 해지 예약 하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '해지',
          confirmButtonColor: '#FFDA4F',
          cancelButtonText: '취소',
          icon: 'question',
        }).then((result) => {
          if (result.isConfirmed) {
            cancelPay(history);
          }
        });
      }

      popupPay(
        data.lid[0],
        payStore.stepPayPid[0],
        dispatch,
        history,
        data,
        pay,
      );
    }
  }

  const itemList = payStore.productData.map((data, index) => (
    <ProductItemContainer key={data.title}>
      <ProductName>
        Lv.{index + 1} {data.title}
      </ProductName>
      {/* 결제 가격 임시 주석 처리 */}
      {/* <PriceText>{data.price}</PriceText> */}
      <PriceText>-</PriceText>
      <PeriodText>/30일</PeriodText>
      <div>
        <SubscribeButton
          type="button"
          disabled={pay && pay.status === 'PENDING_CANCEL'}
          value={getButtonText(data.lid[0], pay, payStore)}
          onClick={() => itemClickEvent(data)}
        />
        <SubscribeButton
          type="button"
          value="30일권"
          onClick={() =>
            popupPay(
              data.lid[1],
              payStore.stepPayPid[1],
              dispatch,
              history,
              data,
            )
          }
        />
      </div>
    </ProductItemContainer>
  ));
  return <ProductContainer>{itemList}</ProductContainer>;
}

function Index() {
  const user = useSelector((state) => state.user);
  const pay = useSelector((state) => state.user.pay); // 현재 구독중인 구독권 정보(정보 없을 시 {planId: null}로 나옴)
  const payStore = useSelector((state) => state.payment);
  const [urlOrderId, setOrderId] = useState(''); // 결제 완료 후 스텝페이에서 보내주는 order Id값 셋팅

  const dispatch = useDispatch();
  const history = useHistory();

  async function sendPaymentInfo() {
    await completePayment({ oid: urlOrderId });
  }

  useEffect(() => {
    const url = window.location.search.split('=');
    setOrderId(url[1]);
  }, []);

  useEffect(() => {
    if (urlOrderId) {
      sendPaymentInfo();
    }
  }, [urlOrderId]);

  return (
    <Container>
      <ProductItem
        user={user}
        dispatch={dispatch}
        history={history}
        urlOrderId={urlOrderId}
        pay={pay}
        payStore={payStore}
      />
    </Container>
  );
}

export default Index;

const Container = styled.div`
  width: 100%;
`;
const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    align-items: center;
  }
`;
const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  > div {
    min-width: 220px;
  }
`;

const ProductName = styled.span`
  margin-top: 60px;
  font-size: 18px;
  font-weight: bold;
`;

const PriceText = styled.span`
  margin-top: 15px;
  font-size: 33px;
  color: ${(props) => props.theme.colors.gray};
`;

const PeriodText = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.colors.gray};
  /* color: #ffc83a; */
  width: 50%;
  text-align: right;
`;

// const SubscribeButton = styled.input`
//   width: 150px;
//   height: 50px;
//   background-color: #ffc83a;
//   border-radius: 25px;
//   color: #fff;
//   margin-top: 15px;
// `;

// 임시(단건결제 버튼도 필요해서 임시로 수정)
const SubscribeButton = styled.input`
  width: 105px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 17px;
  color: #fff;
  margin-top: 15px;
  margin-right: 5px;

  :disabled {
    background-color: #eaeaea;
    color: #747474;

    :hover {
      background-color: #eaeaea;
      cursor: default;
    }
  }
`;
