import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { checkSubscribing, getPaymentWindow } from 'components/subscription';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import Kakao from 'assets/icon/payment/kakao_icon.jpg';
// import Payco from 'assets/icon/payment/payco_icon.png';
// import Naver from 'assets/icon/payment/naver_icon.png';
// import Credit from 'assets/icon/payment/icon-card.png';
// import { PublicBtn, InfoTitle, InfoRow, ContentTitle, Content } from '../style';
import { InfoTitle, InfoRow, Content } from '../style';
// import { PublicBtn, InfoTitle, InfoRow, Content } from '../style';

// function getCardInfo(name) {
//   if (!name) {
//     return '신용카드';
//   }

//   let cardName = name;
//   switch (name) {
//     case 'kakaopay':
//       cardName = '카카오페이';
//       break;
//     case 'payco':
//       cardName = '페이코';
//       break;
//     default:
//       break;
//   }

//   return cardName;
// }

// 구독 정보
function index() {
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const { pay } = useSelector((state) => state.user);
  // const [cardInfo, setCardInfo] = useState({ name: '', type: '' });

  useEffect(() => {
    if (pay?.cardName) {
      // setCardInfo({
      //   name: getCardInfo(pay.cardName),
      //   type: pay.cardName,
      // });
    }
  }, [pay]);

  return (
    <MyInfoDiv>
      <InfoTitle>결제 정보</InfoTitle>
      {/* 구독 중 일때 구독정보 보여주기 */}
      {/* {pay && checkSubscribing(user) && (
        <MyInfoContent>
          <InfoRow>
            <div>
              <ContentTitle>결제 수단</ContentTitle>
              <Content>
                <CardIcon alt="cardIcon" data-type={cardInfo.type} />
                <span>{cardInfo.name}</span>
              </Content>
            </div>
            <ChangePayment
              type="button"
              onClick={() => {
                getPaymentWindow(
                  user,
                  'kcp_billing',
                  user.pay,
                  history,
                  dispatch,
                  'method',
                );
              }}
            >
              변경
            </ChangePayment>
          </InfoRow>
          {pay.state === 'failed' && (
            <FailedInfo>
              ⚠️ 결제 실패 : 이용권 혜택을 유지하려면 결제 수단 변경을 7일 이내
              진행해 주세요.
            </FailedInfo>
          )}
          <InfoRow>
            <div>
              <ContentTitle>현재 이용 금액</ContentTitle>
              <Content>{pay.price.toLocaleString('ko-KR')}원</Content>
            </div>
          </InfoRow>
          <InfoRow>
            <div>
              <ContentTitle>다음 결제 금액</ContentTitle>
              <Content>
                {pay.state !== 'canceled' &&
                  `${pay.nextPlanPrice.toLocaleString('ko-KR')}원 `}
                {pay.state !== 'canceled' &&
                  pay.nextPaymentDate &&
                  `(${pay.nextPaymentDate.substring(0, 10)} 결제 예정)`}
                {pay.state === 'canceled' && (
                  <Content>
                    해지 예약 상태 ({pay.endedDate.substring(0, 10)}까지 이용
                    가능)
                  </Content>
                )}
              </Content>
            </div>
          </InfoRow>
        </MyInfoContent>
      )} */}
      {/* 구독 중 아닐 때 보여주기 */}
      {/* {!checkSubscribing(user) && ( */}
      <MyInfoContent>
        <InfoRow>
          <Content>결제 수단이 등록되어 있지 않습니다.</Content>
        </InfoRow>
      </MyInfoContent>
      {/* )} */}
    </MyInfoDiv>
  );
}

export default index;

const MyInfoDiv = styled.div`
  width: 100%;
  padding-top: 50px;

  @media ${(props) => props.theme.mobile} {
    width: 90%;
  }
`;

// const ChangePayment = styled(PublicBtn)`
//   @media ${(props) => props.theme.mobile} {
//     display: none;
//   }
// `;

const MyInfoContent = styled.div`
  @media ${(props) => props.theme.mobile} {
  }
`;

// const FailedInfo = styled.span`
//   display: block;
//   width: fit-content;
//   margin-left: 9.5em;
//   font-size: 12px;
//   margin-top: -0.8em;
//   padding-bottom: 1em;
//   color: ${(props) => props.theme.colors.danger};
// `;

// const CardIcon = styled.img`
//   content: url(${Credit});
//   margin-right: 0.5em;

//   &[data-type='kakaopay'] {
//     content: url(${Kakao});
//   }

//   &[data-type='payco'] {
//     content: url(${Payco});
//   }
// `;
