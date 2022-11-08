import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { openAuthPopup, AuthForm } from '../../../components/auth';
import { getAuthUserPhone } from '../../api';
import {
  InfoRow,
  ContentTitle,
  Content,
  PublicBtn,
  MyInfoDiv,
  ContentDiv,
  CertifyText,
  InfoText,
} from '../../style';
import PasswordChange from './component/Password';

function index() {
  const [EncData, setEncData] = useState('');
  const { userName, email, phone, mobileVerified } = useSelector(
    (state) => state.user,
  );

  const CertifyInfoComponent = (info) => {
    if (!info) return null;
    return (
      <Content>
        <InfoText>{info}</InfoText>
        <CertifyText mobileVerified={mobileVerified}>
          {mobileVerified ? '인증완료' : '미인증'}
        </CertifyText>
      </Content>
    );
  };

  return (
    <MyInfoDiv>
      <InfoRow>
        <ContentTitle>이름</ContentTitle>
        {CertifyInfoComponent(userName)}
      </InfoRow>
      <InfoRow>
        <ContentTitle>휴대폰번호</ContentTitle>
        <ContentDiv>
          {CertifyInfoComponent(phone)}
          <PublicBtn
            type="button"
            onClick={async () => {
              const result = await getAuthUserPhone();
              if (result.sRtnMSG.length === 0) {
                setEncData(result.sEncData);
                openAuthPopup();
              }
            }}
          >
            본인 인증으로 변경
          </PublicBtn>
        </ContentDiv>
      </InfoRow>
      <AuthForm SEncData={EncData} info={{ email, mobileVerified }} />
      <InfoRow>
        <ContentTitle>아이디 (이메일)</ContentTitle>
        {email && <Content>{email}</Content>}
      </InfoRow>
      <PasswordChange />
    </MyInfoDiv>
  );
}

export default index;
