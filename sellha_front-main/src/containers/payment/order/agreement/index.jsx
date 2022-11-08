import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function checkOneTimePayment(pay) {
  if (pay.productId === 730) {
    return [
      '개인정보 수집 및 이용에 동의합니다.',
      '매월 자동결제 상품임을 인지하였으며, 이에 동의합니다.',
    ];
  }

  return [
    '개인정보 수집 및 이용에 동의합니다.',
    '1회성 결제 상품임을 인지하였으며, 이에 동의합니다.',
  ];
}

function Index() {
  const [all, setAll] = useState(false);
  const pay = useSelector((state) => state.payment);
  const content = checkOneTimePayment(pay);
  const [checkList, setCheckList] = useState({
    check1: false,
    check2: false,
  });

  // 체크박스 둘다 체크되면 젠체 동의 체크박스도 체크
  // 하나라도 해제되면 전체 동의 체크박스 체크 해제
  useEffect(() => {
    if (checkList.check1 && checkList.check2) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [checkList]);

  const onChange = (e) => {
    const { id, checked } = e.target;
    setCheckList({
      ...checkList,
      [id]: checked,
    });
  };

  const CheckedAllCheckBox = () => {
    setAll(!all);
    setCheckList({
      check1: !all,
      check2: !all,
    });
  };

  return (
    <Container>
      <CheckAll data-type="all" onClick={CheckedAllCheckBox}>
        <span>전체 동의하기</span>
        <input type="checkbox" checked={all} onChange={CheckedAllCheckBox} />
      </CheckAll>
      <AgreeTextView
        onClick={() => {
          setCheckList({
            ...checkList,
            check1: !checkList.check1,
          });
        }}
      >
        <div>
          <span data-type="highlight">필수</span>
          <span>{content[0]}</span>
        </div>
        <input
          type="checkbox"
          id="check1"
          name="agree"
          onChange={onChange}
          checked={checkList.check1}
        />
      </AgreeTextView>
      <AgreeTextView
        onClick={() => {
          setCheckList({
            ...checkList,
            check2: !checkList.check2,
          });
        }}
      >
        <div>
          <span data-type="highlight">필수</span>
          <span>{content[1]}</span>
        </div>
        <input
          type="checkbox"
          id="check2"
          name="agree"
          onChange={onChange}
          checked={checkList.check2}
        />
      </AgreeTextView>
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
  margin-top: 30px;

  span {
    &[data-type='highlight'] {
      font-size: 9pt;
      border: 2px solid rgb(248, 204, 200);
      color: rgb(238, 80, 64);
      padding: 0 8px;
      border-radius: 5px;
      margin-right: 10px;
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 10px;
    user-select: none;
    cursor: pointer;

    &[data-type='all'] {
      border-bottom: 1px solid #eaeaea;
      padding: 10px;
      span {
        font-size: 20px;
        font-weight: bold;
        color: #666666;
      }
    }
  }

  input[type='checkbox'] {
    &:hover {
      cursor: pointer;
    }
  }
`;

const AgreeTextView = styled.div``;
const CheckAll = styled.div``;
