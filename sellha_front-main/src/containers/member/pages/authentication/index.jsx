import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FindAccountEvent } from './components/FindAccount';
import {
  SuccessSignup,
  signupEvent,
  DuplicateSignup,
} from './components/Signup';
import {
  changePhoneEvent,
  SuccessChangePhone,
  DuplicateChangePhone,
} from './components/PhoneNumber';
import { failedAlert } from './components/Common';

/**
 * 나이스 본인인증 완료 후 리턴 값 받을 팝업 창
 * 리턴 값은 주소에 param으로 받음
 * param: 이름, 전화번호, 휴대폰 번호 또는 회원가입 중복여부
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 */
function index() {
  const [success, setSuccess] = useState(true);
  const [info, setInfo] = useState();

  // 부모 페이지 url 확인(페이지 구분)
  const prePage = window.opener.document.location.pathname;
  // 내 정보 페이지
  const myPage = prePage === '/mypage';
  // 회원가입 페이지
  const signupPage = prePage === '/member/signup';
  // 아이디, 비밀번호 찾기 페이지
  const findPage = prePage.indexOf('findaccount') >= 0;

  // url에 포함된 본인인증 return값 가져오기
  const param = new URLSearchParams(window.location.search);
  const name = decodeURI(param.get('name'));
  const duplicate = JSON.parse(param.get('isDuplicate'));
  const phone = param.get('mobileNumber');
  const email = param.get('email');

  useEffect(async () => {
    // 휴대폰 번호 변경에서 인증, 미인증 체크하기 위해 전달받은 값 셋팅
    setInfo(JSON.parse(window.opener.document.authCheck.info.value));

    // 아이디, 비밀번호 찾기
    if (findPage) {
      if (!name) {
        failedAlert('본인 인증 실패');
      } else {
        FindAccountEvent({ name, email, phone });
      }
    }

    // 번호 중복 아닐 때 실행
    if (!duplicate) {
      // 회원가입
      if (signupPage) {
        signupEvent({ name, phone, setSuccess });
      }
      // 내정보
      else if (myPage) {
        changePhoneEvent({ name, phone, setSuccess });
      }
    }
  }, []);

  function AuthBtnEvent() {
    if (signupPage) {
      // 로그인 페이지로 이동
      window.opener.location.href = '/member/login';
    } else if (myPage) {
      // 내 정보 페이지 리로드
      window.opener.location.reload();
    }

    // 팝업창 닫기
    window.close();
  }

  if (findPage) {
    return <></>;
  }

  // 회원가입, 휴대폰 번호 변경 api 오류 없을 때 보여주기
  if (!success) {
    return (
      <Container>
        <Title>본인인증 실패</Title>
        <Message>일시적인 오류가 발생했습니다.</Message>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{duplicate ? '본인인증 실패' : '본인인증 성공'}</Title>
      <Message>
        {/* 중복 없을 때 */}
        {!duplicate && (
          <>
            {/* 회원가입 페이지 */}
            {signupPage && <SuccessSignup name={name} />}
            {/* 내 정보 페이지 */}
            {myPage && <SuccessChangePhone />}
          </>
        )}
        {/* 회원가입 페이지에서 중복 있을 때 */}
        {duplicate && (
          <>
            {info?.email !== email ? (
              <DuplicateSignup name={name} email={email} />
            ) : (
              <DuplicateChangePhone info={info} />
            )}
          </>
        )}
      </Message>
      <AuthBtn
        type="button"
        onClick={() => {
          AuthBtnEvent();
        }}
      >
        {signupPage && '로그인 하러가기'}
        {myPage && '확인'}
      </AuthBtn>
    </Container>
  );
}

export default index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
`;

const Title = styled.span`
  font-size: 1.15em;
  font-weight: bold;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.44em;
`;

const AuthBtn = styled.button`
  width: 274px;
  height: 54px;
  border-radius: 10px;
  font-size: 1.15em;
  font-weight: bold;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};

  &:hover {
    background-color: ${(props) => props.theme.colors.orange};
  }
`;
