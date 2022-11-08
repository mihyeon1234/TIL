import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import homeReason from 'assets/images/home_reason.png';

function Index() {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <Container>
      <Content
        data-aos="fade-up"
        data-aos-offset="300"
        data-aos-easing="ease-out"
      >
        <span>셀하를 선택해야 하는 이유</span>
        <div>
          <img alt="reason" src={homeReason} />
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
  padding: 120px 0;
  width: 100%;
  background-color: #ffffff;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${(props) => props.theme.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  > span {
    font-size: 36px;
    font-weight: bold;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.8em;
    }
  }

  > div {
    display: flex;
    justify-content: center;
    margin-top: 40px;

    img {
      width: 90%;
    }
  }
`;
