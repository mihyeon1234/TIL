import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Form } from 'antd';
import Swal from 'sweetalert2';
import { changePassword } from 'containers/member/my-page/api';
import {
  InfoRow,
  ContentTitle,
  Content,
  PublicBtn,
  ContentDiv,
} from '../../../style';

const placeholder = {
  origin: '현재 비밀번호를 입력하세요.',
  password: '새 비밀번호를 입력하세요.',
  confirm: '새 비밀번호를 한 번 더 입력하세요.',
};

function index() {
  // input 모드로 변경
  const [mode, setMode] = useState(false);
  // 에러 메세지
  const [message, setMessage] = useState({
    same: false,
    origin: false,
    condition: false,
  });
  // password 값
  const [password, setPassword] = useState({
    password: '',
    confirm: '',
    origin: '',
  });

  const ohChangeHandle = (e) => {
    const data = e.target.value;
    const targetName = e.target.name;
    const blankCheck = data.search(/\s/) >= 0;
    const engRegExp = data.search(/[a-zA-Z]/) >= 0;
    const numRegExp = data.search(/[0-9]/) >= 0;
    const lenCheck = data.length >= 8 && data.length <= 24;

    // 공백 아닐 때만 입력
    if (!blankCheck) setPassword((prev) => ({ ...prev, [targetName]: data }));

    // 기존 비밀번호 오류 메세지 지우기
    if (message.origin) {
      setMessage((prev) => ({ ...prev, origin: false }));
    }

    if (targetName.indexOf('password') >= 0) {
      const condition = !engRegExp || !numRegExp || !lenCheck;
      // 조건 만족하는지 체크
      setMessage((prev) => ({ ...prev, condition }));
    }

    if (targetName !== 'origin') {
      // 새 비밀번호 똑같은지 체크
      const otherName = targetName === 'confirm' ? 'password' : 'confirm';
      const sameCheck = data === password[otherName];

      setMessage((prev) => ({ ...prev, same: !sameCheck }));
    }
  };

  function resetState() {
    setMode(false);
    setMessage({
      same: false,
      origin: false,
      condition: false,
    });
    setPassword({
      password: '',
      confirm: '',
      origin: '',
    });
  }

  const phoneNumberChangeHandle = async () => {
    const result = await changePassword({
      originalPassword: password.origin,
      newPassword: password.confirm,
    });

    if (!result) {
      setMessage((prev) => ({
        ...prev,
        origin: true,
      }));
    } else {
      resetState();
      Swal.fire({
        title: '',
        text: '🔐 비밀번호 변경을 성공 했습니다.',
        confirmButtonText: '확인',
      });
    }
  };

  function PasswordChangeButtons() {
    if (!mode) {
      return (
        <ChangeBtn
          type="button"
          onClick={() => {
            setMode(true);
          }}
        >
          변경
        </ChangeBtn>
      );
    }

    return (
      <div>
        {/* 수정 모드 */}
        <ChangeBtn
          type="button"
          disabled={
            message.origin ||
            message.condition ||
            message.same ||
            password.origin.length === 0 ||
            password.password.length === 0 ||
            password.confirm.length === 0
          }
          onClick={phoneNumberChangeHandle}
        >
          확인
        </ChangeBtn>
        <CancelBtn
          type="button"
          onClick={() => {
            resetState();
          }}
        >
          취소
        </CancelBtn>
      </div>
    );
  }

  return (
    <Form>
      <InfoRow>
        <ContentTitle>비밀번호</ContentTitle>
        <ContentDiv>
          {!mode ? (
            // 수정 모드 아닐 때
            <Content>••••••••</Content>
          ) : (
            // 수정 모드
            <PasswordInput
              name="origin"
              placeholder={placeholder.origin}
              visibilityToggle={false}
              value={password.origin}
              data-error={message.origin}
              onChange={ohChangeHandle}
              autoComplete="on"
            />
          )}
          <PasswordChangeButtons />
        </ContentDiv>
      </InfoRow>
      {mode && (
        <ChangeDiv>
          {message.origin && (
            <Message>현재 비밀번호를 정확히 입력하세요.</Message>
          )}
          <PasswordInput
            name="password"
            placeholder={placeholder.password}
            visibilityToggle={false}
            value={password.password}
            onChange={ohChangeHandle}
            data-error={message.same || message.condition}
            autoComplete="on"
          />
          <PasswordInput
            name="confirm"
            placeholder={placeholder.confirm}
            visibilityToggle={false}
            value={password.confirm}
            onChange={ohChangeHandle}
            data-error={message.same || message.condition}
            autoComplete="on"
          />
          <Message>
            {message.condition && '8 ~ 24자의 영문자와 숫자를 포함하세요.'}
            {!message.condition &&
              message.same &&
              '비밀번호가 일치하지 않습니다.'}
          </Message>
        </ChangeDiv>
      )}
    </Form>
  );
}

export default index;

const PasswordInput = styled(Input.Password)`
  width: 17em !important;
  margin-bottom: 5px;
  height: 40px !important;
  border-radius: 5px;

  &[data-error='true'] {
    border: 1px solid ${(props) => props.theme.colors.danger};
  }
`;

const ChangeBtn = styled(PublicBtn)`
  &:disabled {
    background-color: unset;
    cursor: default;
  }
`;

const ChangeDiv = styled.div`
  margin-left: 8em;
`;

const CancelBtn = styled(PublicBtn)`
  margin-left: 5px;
`;

const Message = styled.div`
  margin-bottom: 5px;
  font-size: 0.85em;
  color: ${(props) => props.theme.colors.danger};

  .tooltipCondition {
    display: flex;
    flex-direction: column;
    min-width: 20em;
    max-width: 26em;
    font-size: 0.75em;
    font-weight: 300;
    border-radius: 1em;
    padding: 10px;
    pointer-events: auto !important;
    &:hover {
      visibility: visible !important;
    }
  }
`;
