import React from 'react';
import styled from 'styled-components';

import PayTitleBackground from 'assets/images/pay-title-background.png';
import PayPersonImage from 'assets/images/pay_title.png';
import PayCheck from 'assets/images/pay-check.png';

function Index() {
  return (
    <Container>
      <BackgroundImage alt="payment" src={PayTitleBackground} />
      <BackgroundImageMobile alt="payment" src={PayTitleBackground} />
      <div>
        <TitleContainer>
          <span>이 모든 서비스를</span>
          <span>비용 부담 없이 시작해보세요</span>
        </TitleContainer>
        <SubTitleContainer>
          <SubTitle>
            <CheckIcon alt="check" src={PayCheck} />
            <SubContent>14일 후 정기결제 시작</SubContent>
            <EventContent>베타 테스트 기간 무료 운영</EventContent>
          </SubTitle>
          <SubTitle>
            <CheckIcon alt="check" src={PayCheck} />
            <span>언제든 해지 가능</span>
          </SubTitle>
        </SubTitleContainer>
      </div>
      <PersonImage alt="person" src={PayPersonImage} />
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 350px;
  margin-top: 165px;
  @media ${(props) => props.theme.mobile} {
    justify-content: center;
    margin-top: 0;
  }
`;

const BackgroundImage = styled.img`
  height: 250px;
  margin-right: 22%;
  position: relative;
  top: 18px;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const BackgroundImageMobile = styled.img`
  display: none;
  position: absolute;
  transform: rotate(90deg);
  top: -3%;
  height: 50%;
  @media ${(props) => props.theme.mobile} {
    display: block;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 318px;
  @media ${(props) => props.theme.mobile} {
    margin-top: 35%;
  }

  span {
    font-size: 40px;
    font-weight: bold;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.9em;
    }
  }
`;

const SubTitleContainer = styled.div`
  margin-top: 30px;
`;

const SubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.2em;
  }
`;

const SubContent = styled.span`
  text-decoration: line-through;
  text-decoration-thickness: 0.15rem;
  text-decoration-color: ${(props) => props.theme.colors.primary};
`;

const CheckIcon = styled.img`
  margin-right: 15px;
`;

const EventContent = styled.span`
  margin-left: 0.5em;
  border: 0.12em solid #ffd94f6f;
  background-color: #ffffff7b;
  color: ${(props) => props.theme.colors.orange};
  box-shadow: 1px 1px 5px -3px;
  border-radius: 0.2em;
  padding: 0.1em 0.25em;
`;

const PersonImage = styled.img`
  margin-left: 50px;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;
