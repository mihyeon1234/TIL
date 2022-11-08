import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import LoginBtn from './components/LoginBtn';
import MemberIntro from '../../components/MemberIntro';
import { Container, EmptyBtn } from '../../style/index';
import { useLogin } from './hook';

/**
 * 자동로그인, 이메일 저장 기능 기본값으로 변경
 * 리프레시 토큰 쿠키로 저장
 * (최면경님과 상의 후 적용)
 * 업데이트: 21.11.16
 * 수정자: 장다영
 */

export default function LoginPage() {
  const history = useHistory();
  const {
    visibleAlert,
    loading,
    onClickLogin,
    setVisibleAlert,
    onChangeInput,
  } = useLogin();

  return (
    <Container>
      <MemberIntro />
      <LoginDiv>
        <SInput
          defaultValue={localStorage.getItem('saveEmail')}
          name="email"
          type="email"
          placeholder="이메일"
          onChange={(e) => onChangeInput(e)}
          onPressEnter={onClickLogin}
        />
        <SInput
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={(e) => onChangeInput(e)}
          onKeyPress={(e) => {
            const checkCapsLock = e.getModifierState('CapsLock');
            if (checkCapsLock) {
              setVisibleAlert('capsLock');
            } else {
              setVisibleAlert('');
            }
          }}
          onPressEnter={onClickLogin}
        />
        <AlertText>
          {visibleAlert === 'email' &&
            '이메일이 잘못 입력 되었거나 없는 계정입니다.'}
          {visibleAlert === 'password' && '비밀번호가 잘못 입력 되었습니다.'}
          {visibleAlert === 'capsLock' && 'CapsLock이 켜져 있습니다.'}
        </AlertText>
        <LoginBtn loading={loading} onClickLogin={onClickLogin} />
        <FindDiv>
          <FindButton
            type="button"
            onClick={() => {
              history.push('/member/findaccount?tab=1');
            }}
          >
            이메일 찾기
          </FindButton>
          <FindButton
            type="button"
            onClick={() => {
              history.push('/member/findaccount?tab=2');
            }}
          >
            비밀번호 찾기
          </FindButton>
        </FindDiv>
        <LineDiv>
          <Line />
          <LineText>셀하가 처음이신가요?</LineText>
          <Line />
        </LineDiv>
        <EmptyBtn to="/member/signup">간편 회원가입</EmptyBtn>
      </LoginDiv>
    </Container>
  );
}

const LoginDiv = styled.div`
  width: 21.5rem;
  padding: 0.8em;
  margin-top: 3em;
`;

const SInput = styled(Input)`
  height: auto;
  padding: 0.8em;
  margin-bottom: 1em;
  border: none;

  border-bottom: 2px solid ${(props) => props.theme.black};

  :focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.black};
  }
  :hover {
    border-bottom: 2px solid ${(props) => props.theme.black};
  }

  font-size: 1em;
`;

const FindDiv = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 0.9em;
  > a:hover {
    font-weight: 600;
    color: ${(props) => props.theme.colors.black};
  }
`;

const LineDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 2.5rem 0 2rem 0;
`;

const Line = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.lightGray};
  width: 100%;
`;

const LineText = styled.span`
  font-size: 0.8rem;
  width: 28rem;
  margin: 0 0.5rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const FindButton = styled.button`
  color: ${(props) => props.theme.colors.black};
  text-decoration: none;
  font-weight: 400;
  background: unset;

  &:hover {
    font-weight: 600;
    background: unset;
  }
`;

// const SignUpButton = styled(Link)`
//   display: block;
//   width: 100%;
//   padding: 0.7em;
//   border-radius: 0.3rem;
//   font-size: 1.1em;
//   text-align: center;
//   letter-spacing: 1px;
//   color: ${(props) => props.theme.colors.black};
//   border: 1px solid ${(props) => props.theme.colors.black};
//   background-color: ${(props) => props.theme.colors.white};

//   :hover {
//     border: 1px solid ${(props) => props.theme.colors.primary};
//     background-color: ${(props) => props.theme.colors.white};
//     color: ${(props) => props.theme.colors.orange};
//   }
// `;

const AlertText = styled.span`
  font-size: 0.9em;
  color: ${(props) => props.theme.colors.danger};
`;
