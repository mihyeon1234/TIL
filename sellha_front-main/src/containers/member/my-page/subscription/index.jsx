import React from 'react';
// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import {
//   checkSubscribing,
//   checkNoPaymentDate,
//   moveOrderPage,
//   getPlanName,
// } from 'components/subscription';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { DownOutlined } from '@ant-design/icons';
// import ReactTooltip from 'react-tooltip';
// import { localInfo } from 'http-api';
// import { onlyOkAlert } from 'components/public-alert';
// import { setUserInfo } from 'redux/user';
// import { canceledToPaid } from '../../../subscribe/api';
// import CancelModal from '../modal/cancel-subscription/index';
// import { PublicBtn, InfoTitle, InfoRow, Content, ContentTitle } from '../style';
import { InfoTitle, InfoRow, Content, ContentTitle } from '../style';

// 구독 정보
// function index({ setVisible }) {
function index() {
  //   const history = useHistory();
  //   const dispatch = useDispatch();
  const { pay } = useSelector((state) => state.user);
  //   const user = useSelector((state) => state.user);
  //   const [showCancel, setShowCancel] = useState(false);

  return (
    <MyInfoDiv>
      <InfoTitle>이용권 정보</InfoTitle>
      {/* {pay && checkSubscribing(user) && (
        <InfoRow>
          <SubscriptionInfo>
            {pay && pay.state !== 'canceled' && (
              <Counted>{`${getPlanName(pay.planName)} ${
                pay.counted
              }회차`}</Counted>
            )}
            {pay && pay.state === 'canceled' && (
              <Counted>{`${getPlanName(pay.planName)}`}</Counted>
            )}
            <Counted>{`${getPlanName(pay.planName)}`}</Counted>
            <Content>
              일간 모니터링 상품 {pay.productMax}개, 키워드 {pay.keywordMax}
              개까지 등록
            </Content>
          </SubscriptionInfo>
          <div>
            <SubscriptionBtn type="button" data-tip data-for="addFunction">
              이용 내역
              <DownArrowIcon />
            </SubscriptionBtn>
            <ReactTooltip id="addFunction" effect="solid">
              서비스 준비 중입니다 🐝
            </ReactTooltip>

            {pay.state !== 'canceled' && (
              <>
                <SubscriptionBtn
                  type="button"
                  onClick={() => {
                    // if (!checkNoPaymentDate(Info)) {
                    setVisible(true);
                    // }
                  }}
                >
                  변경
                </SubscriptionBtn>
                <SubscriptionBtn
                  type="button"
                  onClick={() => {
                    if (!checkNoPaymentDate(user)) {
                      setShowCancel(true);
                    }
                  }}
                >
                  해지
                </SubscriptionBtn>
              </>
            )}
            {pay.state === 'canceled' && (
              <PublicBtn
                type="button"
                data-type="canceled"
                onClick={async () => {
                  const result = await canceledToPaid();
                  if (result.code === 0) {
                    onlyOkAlert({
                      title: '해지 예약 취소',
                      text: '자동 결제가 재 등록되었습니다.',
                    }).then(async (res) => {
                      if (res) {
                        const userInfo = await localInfo();
                        dispatch(setUserInfo(userInfo));
                      }
                    });
                  } else {
                    onlyOkAlert({
                      title: '해지 예약 취소 실패',
                      text: '자동 결제가 재 등록을 실패했습니다. 다시 한번 시도해주세요.',
                    });
                  }
                }}
              >
                해지 취소
              </PublicBtn>
            )}
          </div>
        </InfoRow>
      )} */}
      {/* 구독 중 아닐 때 보여주기 */}
      {/* {!checkSubscribing(user) && ( */}
      <MyInfoContent>
        <InfoRow>
          <SubscriptionInfo>
            {/* <Counted>뉴비셀러</Counted>
            <Content>사용중인 이용권이 없습니다.</Content> */}
            <Counted>꿀벌셀러</Counted>
            <Content>베타 테스트 기간입니다.</Content>
          </SubscriptionInfo>
          <div>
            {/* <SubscriptionBtn
              type="button"
              onClick={() => history.push('/subscribe')}
            >
              이용권 알아보기
            </SubscriptionBtn> */}
            {/* 이용권 구매이력 없는 사람만 보여주기 */}
            {/* {!user?.isFreetrial && (
              <SubscriptionBtn
                type="button"
                data-type="black"
                onClick={() => moveOrderPage(0, null, history, dispatch, user)}
              >
                꿀벌셀러 체험하기
              </SubscriptionBtn>
            )} */}
          </div>
        </InfoRow>
      </MyInfoContent>
      {/* )} */}
      {pay && pay.state === 'canceled' && (
        <RemoveData>
          🚨 구독이 종료되면 저장된 모든 데이터는 삭제됩니다.
        </RemoveData>
      )}
      {/* {pay && (
        <CancelModal showCancel={showCancel} setShowCancel={setShowCancel} />
      )} */}
    </MyInfoDiv>
  );
}

export default index;

const MyInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 50px;
  @media ${(props) => props.theme.mobile} {
    width: 90%;
  }
`;

// const SubscriptionBtn = styled(PublicBtn)`
//   @media ${(props) => props.theme.mobile} {
//     display: none;
//   }
// `;

const MyInfoContent = styled.div`
  @media ${(props) => props.theme.mobile} {
  }
`;

const Counted = styled(ContentTitle)`
  color: unset !important;
`;

const RemoveData = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 8em;
  color: ${(props) => props.theme.colors.darkGray};
`;

// const DownArrowIcon = styled(DownOutlined)`
//   margin-left: 5px;
// `;

const SubscriptionInfo = styled.div`
  display: flex;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    align-items: flex-start !important;
  }
`;
