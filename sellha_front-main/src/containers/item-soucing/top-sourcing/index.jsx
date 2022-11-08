import React from 'react';
import styled from 'styled-components';
import SourcingBack from 'assets/images/sourcing_title.png';
import SourcingBee from 'assets/images/sourcing_bee.png';

function Index() {
  return (
    <Container>
      <SourcingIntro />
      <div>
        <SourcingTextView>
          <SourcingTitle>소싱, 더 이상 고민하지 마세요!</SourcingTitle>
          <SourcingSubText>공장 발굴부터 계약까지</SourcingSubText>
          <SourcingSubText>셀하가 알아서 다 해 드릴게요</SourcingSubText>
          <RequestButton
            type="button"
            value="의뢰하러 가기"
            onClick={() => {
              window.open('https://forms.gle/PqMtBUbXF3CLb81o8');
            }}
          />
        </SourcingTextView>
        <BeeImage alt="bee" src={SourcingBee} />
      </div>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
`;

const SourcingTopView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SourcingIntro = styled(SourcingTopView)`
  width: 63%;
  height: 665px;
  min-width: 1072px;
  min-height: 665px;
  margin-top: 50px;
  background-image: url(${SourcingBack});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    background: unset;
    min-width: unset;
    height: unset;
    margin-bottom: 100px;
  }
`;
const SourcingTextView = styled(SourcingTopView)`
  position: relative;
  top: -20px;
  float: left;
  margin: 70px 0 70px 155px;
`;

const BeeImage = styled.img`
  float: left;
`;

const SourcingTitle = styled.span`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 15px;

  @media ${(props) => props.theme.mobile} {
    font-size: 25px;
  }
`;
const SourcingSubText = styled.span`
  font-size: 18px;

  @media ${(props) => props.theme.mobile} {
    font-size: 15px;
  }
`;
const RequestButton = styled.input`
  background: #ffc83a;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin-top: 50px;
  padding: 15px 40px;
  color: ${(props) => props.theme.colors.white};
  font-size: 15px;
  margin-bottom: 3%;
  &:hover,
  &:focus,
  &:active {
    background: black;
  }
`;
