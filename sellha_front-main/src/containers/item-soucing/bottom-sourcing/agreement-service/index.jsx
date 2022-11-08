import React from 'react';
import styled from 'styled-components';
import AgreementBackground from 'assets/images/agreement-service-back.png';
import ArrowRight from 'assets/icon/arrow-right-yw.png';
import CompleteImage from 'assets/images/sourcing_complete.png';

const SourcingStepData = [
  {
    title: '거래 신청',
    sub: ['전문가와', '간단한 상담으로', '계약을 요청하세요.'],
  },
  {
    title: '생산자 협상',
    sub: [
      '셀하에서 업체와',
      '협상을 진행합니다.',
      '(디자인, 불량관리,',
      '출고 일정, OEM 및 ODM 등)',
    ],
  },
  {
    title: '계약서 작성',
    sub: ['셀하가 업체와 협의 후,', '계약서를 작성합니다.'],
  },
  {
    title: '계약 내용 확인',
    sub: ['작성된 계약 내용을', '확인해보세요.'],
  },
  {
    title: '계약 완료',
    sub: ['서명을 통해', '계약을 완료합니다.'],
  },
];

function StepContainer() {
  const stepItem = SourcingStepData.map((data, index) => {
    const subItem = data.sub.map((item) => <span key={item}>{item}</span>);

    return (
      <StepItemView key={data.toString()}>
        <StepItemContainer>
          <StepTitleSpan data-type={data.type}>{data.title}</StepTitleSpan>
          {SourcingStepData.length > index + 1 && (
            <img src={ArrowRight} alt="arrow" />
          )}
          {SourcingStepData.length === index + 1 && (
            <SourcingCheck src={CompleteImage} alt="check" />
          )}
        </StepItemContainer>
        <StepSubView>{subItem}</StepSubView>
      </StepItemView>
    );
  });
  return <AgreementStepView>{stepItem}</AgreementStepView>;
}

function Index() {
  return (
    <Container>
      <ExplanationView>
        <span>
          국내 또는 해외 업체와의 계약 절차가 낯설거나 협상이 어려운 셀러들을
          위해 계약을 도와드립니다.
        </span>
      </ExplanationView>
      <StepView>
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
`;
const StepView = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-image: url(${AgreementBackground});
  width: 60%;
  height: 400px;
  margin-top: 50px;
  background-repeat: no-repeat;
  background-position: bottom;
  @media ${(props) => props.theme.mobile} {
    width: unset;
    background: unset;
  }
`;
const StepItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AgreementStepView = styled(StepItemContainer)`
  @media ${(props) => props.theme.mobile} {
    flex-wrap: wrap;
  }
`;

const StepItemView = styled.div`
  height: 150px;
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
  border: 1px solid #ebebeb;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
`;

const SourcingCheck = styled.img`
  position: relative;
  left: -40px;
  top: -23px;
`;
