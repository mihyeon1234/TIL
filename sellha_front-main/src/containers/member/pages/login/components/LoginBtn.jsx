import React from 'react';
// import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { FullBtn } from 'containers/member/style';

export default function LoginBtn({ loading, onClickLogin }) {
  return (
    <FullBtn onClick={onClickLogin}>
      {loading && <LoadingOutlined />}
      {!loading && `로그인`}
    </FullBtn>
  );
}

// const LoginButton = styled.button`
//   width: 100%;
//   padding: 0.7em;
//   margin-top: 1.5rem;
//   border-radius: 0.3rem;
//   font-size: 1.1em;
//   letter-spacing: 1px;
//   background-color: ${(props) => props.theme.colors.black};
//   color: ${(props) => props.theme.colors.white};
// `;
