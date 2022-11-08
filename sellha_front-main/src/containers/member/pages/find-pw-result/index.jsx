import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Form } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { findPassword } from '../api';
import MemberIntro from '../../components/MemberIntro';
import PasswordInput from './component/PasswordInput';

export default function ChangePasswordPage() {
  const { condition, input } = useSelector((state) => state.findPasswordResult);
  const param = new URLSearchParams(window.location.search);
  const email = param.get('email');
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('enc'));
    if (storageData) localStorage.setItem('enc', false);
    // 본인인증 값  없으면 비밀번호 찾기로 이동
    else history.push('/member/findaccount?tab=2');
  }, []);

  async function handleSubmit() {
    try {
      const { message } = await findPassword({
        email,
        password: input.password,
      });

      if (message === 'ok') {
        alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
        history.push('/member/login');
      }
    } catch {
      alert('비밀번호 변경 실패. 잠시후 다시 시도하여주세요.');
    }
  }

  return (
    <Container>
      <MemberIntro />
      <TitleDiv>비밀번호 변경</TitleDiv>
      <Contents>
        <PasswordInput name="password" setDisabled={setDisabled} />
        <ConditionDiv>
          <Condition data-check={condition.eng}>
            영문포함 <CheckOutlined />
          </Condition>
          <Condition data-check={condition.num}>
            숫자포함 <CheckOutlined />
          </Condition>
          <Condition data-check={condition.len}>
            8-24자 이내 <CheckOutlined />
          </Condition>
        </ConditionDiv>
        <PasswordInput name="confirm" setDisabled={setDisabled} />
        <ConditionDiv>
          <SameCondition data-check={condition.same}>
            비밀번호 일치 <CheckOutlined />
          </SameCondition>
        </ConditionDiv>
        <SubmitButton disabled={disabled} onClick={() => handleSubmit()}>
          변경하기
        </SubmitButton>
      </Contents>
      <Link to="/member/login">
        <ToLoginDiv>로그인 하러 돌아가기</ToLoginDiv>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: auto;
  margin-top: 12em;
`;

const TitleDiv = styled.div`
  margin-top: 1em;

  font-size: 1.3em;
  font-weight: bold;
`;

const Contents = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 0.8em;
  margin-top: 3em;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.black};
  padding: 0.7em;
  margin-top: 4em;
  width: 100%;

  color: ${(props) => props.theme.colors.white};
  font-size: 1.1em;
  letter-spacing: 1px;

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray};
    cursor: default;
  }
`;
const ToLoginDiv = styled.div`
  margin-top: 3em;
  margin-bottom: 7em;

  color: ${(props) => props.theme.colors.darkGray};
`;

const ConditionDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Condition = styled.span`
  font-size: 0.75rem;

  &[data-check='false'] {
    color: ${(props) => props.theme.colors.gray};
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const SameCondition = styled(Condition)`
  color: ${(props) => props.theme.colors.orange};
`;
