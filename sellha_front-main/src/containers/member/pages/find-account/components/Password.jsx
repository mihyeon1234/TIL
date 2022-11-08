import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Input } from 'antd';
import { setErrorMsg } from '../reducer';
import { FindInfo } from '../../../style/index';

function index({ emailInput }) {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.findAccount);
  const [emailInputData, setEmailInputData] = useState('');

  useEffect(() => {
    if (emailInputData.length > 0) {
      dispatch(setErrorMsg(''));

      const verifyEmail =
        /^[a-z\d]([-._]?[a-z\d])*@[a-z\d]([-.]?[a-z\d])*\.[a-z]{2,3}$/i;
      if (!verifyEmail.test(emailInputData)) {
        dispatch(setErrorMsg('올바른 이메일 형식이 아닙니다.'));
      }
    }
  }, [emailInputData]);

  return (
    <Container>
      <FindInfo>
        <span>휴대폰 본인인증을 통해</span>
        <span>비밀번호를 변경하실 수 있습니다.</span>
      </FindInfo>
      <EmailInput
        id="email"
        value={emailInputData}
        ref={emailInput}
        placeholder="이메일(아이디)"
        onChange={(e) => setEmailInputData(e.target.value.trim())}
      />
      {message?.length > 0 && <Error>{message}</Error>}
    </Container>
  );
}

export default index;

const Container = styled.div`
  height: 9.5em;
`;

const EmailInput = styled(Input)`
  height: 3em !important;
`;

const Error = styled.span`
  font-size: 0.7rem;
  margin-left: 5px;
  color: ${(props) => props.theme.colors.danger};
`;
