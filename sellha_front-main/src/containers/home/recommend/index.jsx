import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Person1 from 'assets/images/home_person1.png';
import Person2 from 'assets/images/home_person2.png';
import Person3 from 'assets/images/home_person3.png';

function Index() {
  useEffect(() => {
    AOS.init({ duration: 4000, disable: 'mobile' });
  }, []);

  return (
    <Container>
      <Content
        data-aos="fade-up"
        data-aos-easing="ease-out"
        data-aos-offset="400"
      >
        <span>이런 분들께 추천드립니다.</span>
        <div>
          <div>
            <div className="person1 person" />
            <Circle color="#f8d271" />
            <span>스토어 창업을</span>
            <span>준비 중인 분</span>
          </div>
          <div>
            <div className="person2 person" />
            <Circle color="#76bcc6" />
            <span>어디서부터 시작할 지</span>
            <span>막막한 분</span>
          </div>
          <div>
            <div className="person3 person" />
            <Circle color="#baaed4" />
            <span>스토어 운영에</span>
            <span>어려움을 겪는 분</span>
          </div>
        </div>
      </Content>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  background-color: #f8f8f8;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;

  > span {
    font-size: 36px;
    font-weight: bold;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.8em;
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 40px;
    @media ${(props) => props.theme.mobile} {
      flex-direction: column;
      align-items: center;
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 355px;
      width: 275px;
      padding: 0 20px;
      border: 1px solid #7f7f7f;
      background-color: #fff;

      &:not(:last-child) {
        margin-right: 40px;
        @media ${(props) => props.theme.mobile} {
          margin-right: unset;
          margin-bottom: 15px;
        }
      }

      span {
        font-size: 20px;
      }

      .person {
        height: 180px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }

      .person1 {
        background-image: url(${Person1});
      }
      .person2 {
        background-image: url(${Person2});
      }
      .person3 {
        background-image: url(${Person3});
      }
    }
  }
`;

const Circle = styled.div`
  position: relative;
  top: -15px;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-color: ${(props) => props.color};
`;
