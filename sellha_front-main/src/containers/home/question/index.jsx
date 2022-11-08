import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Index() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <Container>
      <Content
        data-aos="fade-up"
        data-aos-offset="400"
        data-aos-easing="ease-out"
      >
        <div>자주 묻는 질문</div>
        <QuestionView>
          <div>셀하의 기능을 미리 체험해 볼 수 있나요?</div>
          <div>한달만 구독할 수도 있나요?</div>
          <div>멤버쉽을 변경할 수 있나요?</div>
          <div>신용카드 매출전표를 받을 수 있나요?</div>
          <div>결제취소는 어떻게 하나요?</div>
        </QuestionView>

        <input
          type="button"
          value="더 많은 질문 보러 가기"
          onClick={() =>
            window.open(
              'https://malanghoney.notion.site/d8251cdb398e46888f2cb82191562eb1',
            )
          }
        />
      </Content>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  width: 100%;
  padding: 100px 0;
  background-color: #f8f8f8;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  > div:first-child {
    font-size: 33px;
    font-weight: bold;
    margin-bottom: 30px;

    @media ${(props) => props.theme.mobile} {
      font-size: 1.8em;
    }
  }

  input[type='button'] {
    margin-top: 50px;
    background-color: #ffffff;
    border: 1px solid #000000;
    height: 65px;
    width: 280px;
    border-radius: 50px;
    font-size: 22px;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.1em;
      width: 200px;
      height: 50px;
    }

    &:hover {
      border-color: #f8d271;
      color: #f8d271;
    }
  }
`;

const QuestionView = styled.div`
  width: 50%;
  @media ${(props) => props.theme.mobile} {
    width: 90%;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 75px;
    font-size: 22px;
    @media ${(props) => props.theme.mobile} {
      font-size: 0.9em;
      height: 55px;
    }

    &:first-child {
    }

    &:not(:last-child) {
      border-bottom: 1px solid #afafaf;
    }
  }
`;
