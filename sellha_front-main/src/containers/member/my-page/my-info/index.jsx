import React from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
// import { onlyOkAlert } from 'components/public-alert';
import { InfoTitle, UnderlineBtn } from '../style';
import LeftContent from './left-content/index';
import RightContent from './right-content/index';

function index() {
  //   const { pay } = useSelector((state) => state.user);
  const history = useHistory();

  function secession() {
    history.push('/deleteaccount');
  }

  return (
    <Container>
      <InfoTitle>내 정보</InfoTitle>
      <Content>
        <LeftContent />
        <RightContent />
      </Content>
      <AccountDeleteDiv>
        <UnderlineBtn
          type="button"
          onClick={() => {
            // 결제 병합 전 임시
            secession();
            // TODO: 결제 병합 후 사용
            // if (pay && pay.state === 'paid') {
            //   onlyOkAlert({
            //     text: '이용권 이용 중에는 탈퇴하실 수 없습니다.',
            //   });
            // } else {
            //   secession();
            // }
          }}
        >
          탈퇴하기
        </UnderlineBtn>
      </AccountDeleteDiv>
    </Container>
  );
}

export default index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;

  @media ${(props) => props.theme.mobile} {
    width: 90%;
  }
`;
const AccountDeleteDiv = styled.div`
  float: left;
  width: 100%;
  button {
    float: right;
  }
`;
