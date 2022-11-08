import React from 'react';
import styled from 'styled-components';
import SourcingBackground from 'assets/images/sourcing-service-back.png';
import ArrowRight from 'assets/icon/arrow-right-yw.png';

const SourcingStepData = [
  {
    title: '소싱요청',
    type: 'highlight',
    sub: ['전문가와', '간단한 상담으로', '소싱을 요청하세요.'],
  },
  {
    title: '업체 발굴',
    type: 'highlight',
    sub: ['상담을 토대로', '셀하에서', '업체를 발굴합니다.'],
  },
  {
    title: '견적 비교',
    type: 'highlight',
    sub: ['다양한 조건의', '견적서를', '비교해보세요.'],
  },
  {
    title: '계약',
    type: 'default',
    sub: ['마음에 드는 조건으로', '셀하와 발주 계약을', '진행해보세요.'],
  },
  {
    title: '발주',
    type: 'default',
    sub: ['카카오톡으로', '쉽고 간편하게', '발주하세요.'],
  },
  {
    title: '물류 대행',
    type: 'default',
    sub: ['복잡한 물류 관리,', '힘든 CS 관리도', '한 번에 해결하세요.'],
  },
];

function StepContainer() {
  const stepItem = SourcingStepData.map((data, index) => {
    const subItem = data.sub.map((item) => <span key={item}>{item}</span>);

    return (
      <div key={data.toString()}>
        <StepItemContainer>
          <StepTitleSpan data-type={data.type}>{data.title}</StepTitleSpan>
          {SourcingStepData.length > index + 1 && (
            <img src={ArrowRight} alt="arrow" />
          )}
        </StepItemContainer>
        <StepSubView>{subItem}</StepSubView>
      </div>
    );
  });
  return <StepItemView>{stepItem}</StepItemView>;
}

function Index() {
  return (
    <Container>
      <StepView>
        <ExplanationView>
          <span>
            셀하를 통해 최적의 공장을 발굴하고 카카오톡으로 쉽고 간편하게
            발주하세요.
          </span>
          <span>
            다양한 업체의 견적서를 <span>무료</span>로 받아보고 게약을
            결정하세요
          </span>
        </ExplanationView>
        <StepContainer />
      </StepView>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ExplanationView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  span:nth-child(1) {
    font-size: 16px;
  }

  span:nth-child(2) span {
    color: #ffc83a;
    font-weight: bold;
  }
`;
const StepView = styled.div`
  width: 62%;
  min-width: 1015px;
  height: 455px;
  padding-right: 30px;
  margin-top: 30px;
  background-image: url(${SourcingBackground});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  @media ${(props) => props.theme.mobile} {
    background: unset;
    min-width: unset;
    padding: unset;
    width: unset;
  }
`;

const StepItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  margin-top: 10px;
`;

const StepItemView = styled(StepItemContainer)`
  @media ${(props) => props.theme.mobile} {
    flex-wrap: wrap;
    align-items: unset;
    justify-content: center;

    > div {
      margin-bottom: 15px;
    }
  }
`;

const StepSubView = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding-left: 18px;
  font-size: 11px;
`;

const StepTitleSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 110px;
  height: 50px;
  background: #ffffff;
  border-radius: 20px;
  margin: 0 10px;
  background-color: transparent;

  &[data-type='highlight'] {
    border: 1px solid #ffda4f;
    box-shadow: 1px 1px 2px rgb(0 0 0 / 25%);
  }

  &[data-type='default'] {
    border: 1px solid #ebebeb;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  }
`;

// const SourcingSpan = styled.span`
//   word-break: keep-all;
//   @media ${(props) => props.theme.mobile} {
//     margin-bottom: 15px;
//   }
// `;
