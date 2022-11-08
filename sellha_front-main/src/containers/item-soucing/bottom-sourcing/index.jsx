import React, { useState } from 'react';
import styled from 'styled-components';
import AgreementService from './agreement-service/index';
import SourcingService from './sourcing-service/index';

function Index() {
  const [title, setTitle] = useState(['select', 'deselect']);
  return (
    <Container>
      <TitleView>
        <ServiceTitle
          data-type={title[0]}
          onMouseOver={() => setTitle(['select', 'deselect'])}
        >
          소싱 서비스
        </ServiceTitle>
        <ServiceTitle
          data-type={title[1]}
          onMouseOver={() => setTitle(['deselect', 'select'])}
        >
          계약 서비스
        </ServiceTitle>
      </TitleView>
      {title[0] === 'select' && <SourcingService />}
      {title[1] === 'select' && <AgreementService />}
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0;
  height: 605px;

  @media ${(props) => props.theme.mobile} {
    height: unset;
  }
`;

const TitleView = styled.div`
  display: flex;
  flex-direction: row;
`;

const ServiceTitle = styled.span`
  font-size: 25px;
  font-weight: bold;
  user-select: none;

  &:nth-child(1) {
    margin-right: 80px;
  }

  &[data-type='select']::after {
    content: '';
    display: block;
    position: relative;
    height: 10px;
    background-color: rgba(255, 218, 79, 0.5);
    bottom: 13px;
  }

  @media ${(props) => props.theme.mobile} {
    font-size: 20px;

    &:nth-child(1) {
      margin-right: 25px;
    }
  }
`;
