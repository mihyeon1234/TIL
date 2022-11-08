import React from 'react';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
// import {
//   // checkNoPaymentDate,
//   getPlanName,
//   checkSubscribing,
// } from 'components/subscription';
import ReactTooltip from 'react-tooltip';

// function index({ setChangeVisible }) {
function index() {
  //   const history = useHistory();
  //   const user = useSelector((state) => state.user);
  //   const { pay } = useSelector((state) => state.user);

  return (
    <Container>
      <Content>
        <SummaryItem>
          <Title>{'이용권 >'}</Title>
          <div>
            {/* {pay && checkSubscribing(user) && (
              <Info>{getPlanName(pay.planName)}</Info>
            )} */}
            {/* {(!pay || !checkSubscribing(user)) && <Info>뉴비셀러</Info>} */}
            {/* 임시 */}
            <Info>꿀벌셀러</Info>
            <Upgrade
              type="button"
              data-tip
              data-for="upgrade"
              onClick={() => {
                // if (pay) {
                //   setChangeVisible(true);
                // } else {
                //   history.push('/subscribe');
                // }
              }}
            >
              업그레이드하기
            </Upgrade>
            <ReactTooltip id="upgrade" effect="solid">
              서비스 준비 중입니다 🐝
            </ReactTooltip>
          </div>
        </SummaryItem>
        <SummaryItem>
          <Title>{'현재 이용 금액 >'}</Title>
          {/* {pay && checkSubscribing(user) && (
            <div>
              <Info>{pay.price.toLocaleString('ko-KR')}원</Info>
              <Sale>{pay.discountPercent}% 적용 중</Sale>
            </div>
          )}
          {(!pay || !checkSubscribing(user)) && <Info>0원</Info>} */}
          {/* 임시 */}
          <Info>0원</Info>
        </SummaryItem>
        <SummaryItem>
          <Title>{'쿠폰 >'}</Title>
          <Info>-</Info>
        </SummaryItem>
      </Content>
    </Container>
  );
}

export default index;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 158px;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.colors.lineGray};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    height: fit-content;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 7%;

  :not(:last-child) {
    min-width: 415px;
    border-right: 1px solid ${(props) => props.theme.colors.lineGray};
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding: 1.3em;
    border-right: none;

    :not(:last-child) {
      min-width: unset;
      border-bottom: 1px solid ${(props) => props.theme.colors.lineGray};
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Title = styled.span`
  font-size: 1.07em;
  color: ${(props) => props.theme.colors.darkGray};
  margin-bottom: 20px;
`;

const Info = styled.span`
  font-size: 2.14em;
  margin-right: 20px;
`;

const Upgrade = styled.button`
  width: 131px;
  height: 40px;
  line-height: 30px;
  padding: 5px 15px;
  font-size: 1.1em;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
`;

// const Sale = styled.span`
//   width: 129px;
//   height: 40px;
//   line-height: 30px;
//   padding: 5px 15px;
//   font-size: 1.4em;
//   border-radius: 5px;
//   background-color: ${(props) => props.theme.colors.success};
//   color: ${(props) => props.theme.colors.white};
//   text-align: center;
// `;
