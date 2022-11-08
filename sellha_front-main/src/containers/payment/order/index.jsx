import React, { useEffect } from 'react';
import styled from 'styled-components';
import SweetAlert from 'sweetalert2';
import { useSelector } from 'react-redux';
import { theme } from 'styles';

import OrderHeader from './header/index';
import Information from './information/index';
import Product from './product/index';
import Payment from './payment/index';
import Agree from './agreement/index';
import Notice from './notice/index';

function SubmitPayment(pay) {
  // 동의항목 두개 다 체크했는지 확인
  const query = 'input[name="agree"]:checked';
  const selectedElements = document.querySelectorAll(query);
  const selectedElementsCnt = selectedElements.length;
  // 결제 수단 선택했는지 확인
  const payQuery = 'div[data-select="true"]';
  const paySelected = document.querySelectorAll(payQuery);
  const paySelectedCnt = paySelected.length;

  if (paySelectedCnt < 1) {
    SweetAlert.fire({
      icon: 'warning',
      title: '결제를 진행할 수 없습니다.',
      text: '결제 수단을 선택해주세요.',
      confirmButtonColor: theme.colors.primary,
    });

    return false;
  }

  if (selectedElementsCnt < 2) {
    SweetAlert.fire({
      icon: 'warning',
      title: '결제를 진행할 수 없습니다.',
      text: '필수항목에 동의해주세요.',
      confirmButtonColor: theme.colors.primary,
    });

    return false;
  }

  const preUrl = `${window.location.origin}/payment`;
  const url = `https://api.steppay.kr/api/orders/${pay.orderId}/pay?successUrl=${preUrl}&errorUrl=${preUrl}&cancelUrl=${preUrl}`;
  window.location.href = url;
}

function checkOneTimePayment(pay) {
  if (pay.productId === pay.stepPayPid[0]) {
    return '구독권 결제하기';
  }

  return '30일권 결제하기';
}

function Index() {
  const pay = useSelector((state) => state.payment);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <OrderHeader />
      <Information />
      <ColumnHorizontalCenter>
        <Product />
        <Payment />
      </ColumnHorizontalCenter>
      <Agree />
      <PaySubmitButton
        type="button"
        value={checkOneTimePayment(pay)}
        onClick={() => SubmitPayment(pay)}
      />
      <Notice />
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColumnHorizontalCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  max-width: 700px;
  min-width: 365px;
`;

const PaySubmitButton = styled.input`
  width: 50%;
  max-width: 700px;
  min-width: 365px;
  height: 50px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: #3c3c3c;
  color: #fff;
`;
