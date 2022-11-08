import React from 'react';
import styled from 'styled-components';
import JoinMain from 'assets/images/congrats_main_pc.png';
import JoinDeco from 'assets/images/congrats_deco_pc.png';
import { localSignup } from '../../api';
import { failedAlert } from './Common';

/**
 * 회원가입에서 입력한 정보 가지고와서 회원가입 이벤트 실행
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @param {String} name             본인인증 후 백엔드에서 넘겨주는 이름
 * @param {String} phone            본인인증 후 백엔드에서 넘겨주는 휴대폰 번호
 * @param {Function} setSuccess
 */
async function signupEvent({ name, phone, setSuccess }) {
  try {
    const signup = JSON.parse(window.opener.document.authCheck.signup.value);

    const { message } = await localSignup({
      name,
      phone,
      email: signup.email,
      password: signup.password,
      referralCode: signup.referralCode,
    });

    if (message !== 'ok') {
      failedAlert('회원가입 실패');
      setSuccess(false);
    }
  } catch {
    failedAlert('회원가입 실패');
    setSuccess(false);
  }
}

/**
 * 회원가입 성공 시 보여줄 뷰
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @param {String} name
 * @returns
 */
function SuccessSignup({ name }) {
  return (
    <>
      <MessageBox>
        <span>{name} 셀러님,</span>
        <JoinDecoImage src={JoinDeco} alt="join" />
      </MessageBox>
      <div>
        <span>셀링하니 회원가입을 축하합니다!</span>
      </div>
      <JoinImg src={JoinMain} alt="join" />
    </>
  );
}

/**
 * 이미 가입된 회원일 시 보여줄 뷰
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @param {String} name
 * @param {String} email
 * @returns
 */
function DuplicateSignup({ name, email }) {
  return (
    <>
      <span>{name} 셀러님,</span>
      <span>이미 가입한 아이디가 존재합니다.</span>
      <InfoDiv>
        <DuplicateId>{email}</DuplicateId>
        <Info>
          본인 명의 가입은 <span>1개의 계정만</span> 가능합니다.
        </Info>
      </InfoDiv>
    </>
  );
}

export { SuccessSignup, signupEvent, DuplicateSignup };

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.44em;
`;

const MessageBox = styled(Message)`
  position: relative;
  top: 0;
`;

const JoinDecoImage = styled.img`
  position: absolute;
  width: 180%;
  top: -30px;
`;

const JoinImg = styled.img`
  margin-top: 2em;
`;

const DuplicateId = styled.span`
  display: block;
  width: fit-content;
  height: 52px;
  line-height: 52px;
  padding: 0 2em;
  border-radius: 5px;
  text-align: center;
  font-size: 0.8em;
  background-color: ${(props) => props.theme.colors.lightGray};
`;

const Info = styled.span`
  margin-top: 1em;
  font-weight: 300;
  font-size: 0.6em;
  color: ${(props) => props.theme.colors.darkGray};

  > span {
    font-weight: 500;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 207px;
  margin-top: 5em;
`;
