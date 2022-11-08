import React from 'react';
import styled from 'styled-components';

const noticeData = [
  '무료체험 기간 이후 매월 구독기간 마지막 날 자동결제 되며, 언제든 해지 가능합니다.',
  '구독권 결제/변경/취소는 언제든지 직접 처리 가능합니다.',
  '구독권 무료 체험 기간 동안 취소시 요금이 결제되지 않습니다.',
  '구독권 최초 결제일로부터 매 30일마다 자동 정기 결제됩니다.',
  '구독권 변경/취소시 결제 방법에 따라 취소 완료까지 최대 7일 소요됩니다.',
];

function Index() {
  const notice = noticeData.map((data) => (
    <span key={data.toString()}>{data}</span>
  ));
  return (
    <Container>
      <span>유의사항</span>
      {notice}
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 700px;
  min-width: 365px;
  margin: 30px 0;

  span {
    display: flex;
    align-items: center;
    padding: 0 15px;

    &:first-child {
      height: 30px;
      background-color: #eaeaea;
      font-weight: bold;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &:not(:first-child) {
      padding-top: 5px;
      border-left: 1px solid #eaeaea;
      border-right: 1px solid #eaeaea;
      font-size: 9pt;
    }

    &:last-child {
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 5px;
      margin-bottom: 30px;
    }
  }
`;
