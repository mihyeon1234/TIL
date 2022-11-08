import { localInfo } from 'http-api';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setUserInfo, deleteUserInfo } from 'redux/user';
import MyInfo from './my-info/index';
import SubscriptionInfo from './subscription/index';
import SummaryPayment from './summary/index';
// import ChangeModal from './modal/subscription';
import PaymentInfo from './payment/index';

export default function MyPage() {
  const [changeVisible, setChangeVisible] = useState(false);
  const dispatch = useDispatch();

  const asyncInfo = async () => {
    try {
      const info = await localInfo();
      dispatch(setUserInfo(info));
    } catch (error) {
      dispatch(deleteUserInfo());
    }
  };

  useEffect(() => {
    asyncInfo();
  }, []);

  return (
    <Container>
      <Body>
        <RightSection>
          <SummaryPayment
            setChangeVisible={setChangeVisible}
            changeVisible={changeVisible}
          />
          {/* 내 정보 */}
          <MyInfo />
          {/* 구독 정보 */}
          <SubscriptionInfo setVisible={setChangeVisible} />
          <PaymentInfo />
        </RightSection>
        {/* {user.pay && (
          <ChangeModal visible={changeVisible} setVisible={setChangeVisible} />
        )} */}
      </Body>
    </Container>
  );
}

const Container = styled.div`
  @media ${(props) => props.theme.mobile} {
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 73vh;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const RightSection = styled.section`
  display: flex;
  width: 1038px;
  min-width: 1038px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    min-width: unset;
    padding: 6% 5%;
    border-radius: 30px 30px 0 0;
    height: fit-content;
    background-color: ${(props) => props.theme.colors.white};
  }
`;
