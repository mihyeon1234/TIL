import React, { useEffect } from 'react';
import styled from 'styled-components';

function index() {
  const param = new URLSearchParams(window.location.search);
  const name = param.get('name');
  const email = param.get('email');

  useEffect(() => {
    localStorage.setItem('enc', false);
  }, []);

  return (
    <div>
      <Content>
        <span>{name} 셀러님,</span>
        <span>가입한 아이디는 아래와 같습니다.</span>
      </Content>
      <Content>
        <EmailSpan>{email}</EmailSpan>
        <Info>본인 명의 가입은 1개의 계정만 가능합니다.</Info>
      </Content>
    </div>
  );
}

export default index;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 0.85rem;
  margin: 2.5em 0 2em 0;
`;

const EmailSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 3em;
  background-color: ${(props) => props.theme.colors.lightGray};
  border-radius: 5px;
  margin-bottom: 5px;
`;

const Info = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.darkGray};
  margin-bottom: 3em;
`;
