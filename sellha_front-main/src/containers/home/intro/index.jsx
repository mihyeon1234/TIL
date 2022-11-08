import React, { useEffect } from 'react';
import styled from 'styled-components';
import mainBack from 'assets/images/img_home_bg.jpg';
import introImage from 'assets/images/intro_img.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Index() {
  useEffect(() => {
    AOS.init({ disable: 'mobile' });
  }, []);

  return (
    <Container>
      <Content
        data-aos="fade-down"
        data-aos-offset="200"
        data-aos-delay="50000"
        data-aos-duration="1500"
        data-aos-easing="ease-out"
      >
        <span>쉽다. 편리하다. 여기에 다 ㅡ 있다.</span>
        <span>셀러를 위한 종합 솔루션</span>
        <div>
          <span>시간도 경험도 부족한 셀러를 위해 실무 베테랑들이 뭉쳤다!</span>
          <div>
            <span>&nbsp;쇼핑몰 운영이 막히는 순간,&nbsp;</span>
            <span>셀하를 찾으세요</span>
          </div>
        </div>
        <img alt="home" src={introImage} />
        <input
          type="button"
          value="활용 가이드 보러 가기 >"
          onClick={() =>
            window.open(
              'https://malanghoney.notion.site/d8251cdb398e46888f2cb82191562eb1',
            )
          }
        />
        <input
          type="button"
          value="대행 서비스 살펴보기 >"
          onClick={() =>
            window.scrollTo({ top: 3500, left: 3500, behavior: 'smooth' })
          }
        />
      </Content>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  width: 100%;
  padding: 75px 0;
  background-image: url(${mainBack});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input[type='button'] {
    margin-top: 50px;
    font-size: 24px;
    font-weight: bold;
    background: unset;
    /* border-bottom: 2px solid #000000; */
    height: 45px;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2em;
      height: 35px;
    }

    :hover {
      color: #f8d271;
    }

    :last-child {
      margin-top: 13px;
    }
  }

  img {
    @media ${(props) => props.theme.mobile} {
      width: 90%;
    }
  }

  > span {
    &:first-child {
      font-size: 25px;
      @media ${(props) => props.theme.mobile} {
        font-size: 1.2em;
      }
    }

    &:nth-child(2) {
      display: flex;
      align-items: center;
      height: 75px;
      font-size: 54px;
      font-weight: bold;
      margin-bottom: 30px;
      @media ${(props) => props.theme.mobile} {
        font-size: 2em;
        height: 45px;
      }
    }
  }

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 30px;

    > span {
      font-size: 22px;
      @media ${(props) => props.theme.mobile} {
        font-size: 1em;
      }
    }

    div {
      display: flex;
      flex-direction: row;

      > span {
        font-size: 22px;
        @media ${(props) => props.theme.mobile} {
          font-size: 1.1em;
        }

        &:first-child {
          background: linear-gradient(
            to top right,
            rgba(153, 112, 0, 0.2),
            rgba(248, 239, 222)
          );
        }
      }
    }
  }
`;
