import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPasswordData, setCapsLock, setCondition } from '../reducer';

function index({ name, setDisabled }) {
  const { input, capslock } = useSelector((state) => state.findPasswordResult);
  const dispatch = useDispatch();

  function onChangeHandle(e) {
    const data = e.target.value;
    const otherName = name === 'password' ? 'confirm' : 'password';
    const blankCheck = data.search(/\s/) >= 0;
    const engRegExp = data.search(/[a-zA-Z]/) >= 0;
    const numRegExp = data.search(/[0-9]/) >= 0;
    const lenCheck = data.length >= 8 && data.length <= 24;
    const sameCheck = data === input[otherName];

    if (!blankCheck) {
      dispatch(setPasswordData({ [name]: data }));
    }

    if (name === 'password') {
      dispatch(
        setCondition({
          eng: engRegExp,
          num: numRegExp,
          len: lenCheck,
        }),
      );
    }

    if (sameCheck && data.length > 0 && input[otherName].length > 0) {
      dispatch(setCondition({ same: true }));
      if (engRegExp && numRegExp && lenCheck && sameCheck) {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
      dispatch(setCondition({ same: false }));
    }
  }

  /**
   * 캡슬락 툴팁을 띄우기 위해 cpaslock state 변경
   * 작성자: 장다영
   * 업데이트: 2022.07.19
   * @param {Object} e
   */
  function changeCapsLockState(e) {
    const targetName = name;
    const otherName = name === 'password' ? 'confirm' : 'password';
    const checkCapsLock = e.getModifierState('CapsLock');

    if (checkCapsLock) {
      dispatch(setCapsLock({ [otherName]: false, [targetName]: true }));
    } else {
      dispatch(setCapsLock({ [targetName]: false }));
    }
  }

  const onKeyDownCheckCapsLock = (e) => {
    changeCapsLockState(e);
  };

  const onKeyUpCheckCapsLock = (e) => {
    changeCapsLockState(e);
  };

  /**
   * input에서 포커스 벗어나면 툴팁 제거
   * 작성자: 장다영
   * 업데이트: 2022.07.19
   */
  const onBlurRemoveCapsLock = () => {
    dispatch(
      setCapsLock({
        password: false,
        confirm: false,
      }),
    );
  };

  return (
    <InputDiv>
      <PasswordInput
        name={name}
        value={input[name]}
        placeholder={name === 'password' ? '비밀번호' : '비밀번호 확인'}
        onChange={(e) => onChangeHandle(e)}
        onKeyDown={onKeyDownCheckCapsLock}
        onKeyUp={onKeyUpCheckCapsLock}
        onBlur={onBlurRemoveCapsLock}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        autoComplete="on"
      />
      {capslock[name] && <Tooltip>키보드에 Caps Lock이 켜져있습니다.</Tooltip>}
    </InputDiv>
  );
}

export default index;

const InputDiv = styled.div`
  position: relative;
`;

const PasswordInput = styled(Input.Password)`
  width: 100%;
  height: auto;
  padding: 0.8em;
  margin-bottom: 1em;
  border: none;

  border-bottom: 2px solid ${(props) => props.theme.black};
  :focus {
    border-bottom: 2px solid ${(props) => props.theme.black};
  }
  :hover {
    border-bottom: 2px solid ${(props) => props.theme.black};
  }

  font-size: 1em;

  &::placeholder {
    color: ${(props) => props.theme.colors.darkGray};
  }

  &:nth-child(3) {
    margin-top: 1em;
  }
`;

const Tooltip = styled.span`
  z-index: 999;
  position: absolute;
  right: -12rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.colors.white};

  &:before {
    content: '';
    position: absolute;
    top: 14px;
    left: -0.3rem;
    display: block;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    background-color: ${(props) => props.theme.colors.white};
    border-left: 1px solid ${(props) => props.theme.colors.gray};
    border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  }
`;
