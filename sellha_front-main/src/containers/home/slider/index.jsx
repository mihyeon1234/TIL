/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import LandingImage01 from '../../../assets/images/landing01.png';
import LandingImage02 from '../../../assets/images/landing02.png';
import LandingImage03 from '../../../assets/images/landing03.png';
import LandingImage04 from '../../../assets/images/landing04.png';

function Index({ setSubSelect }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'slickDots',
    draggable: true,
    appendDots: (dots) => (
      <SliderDots
        onClick={() => {
          setTimeout(() => {
            const clickIndex =
              document.getElementsByClassName('slick-active')[0];
            setSubSelect(clickIndex.dataset.index);
          }, [100]);
        }}
      >
        {dots}
      </SliderDots>
    ),
  };

  return (
    <Container>
      <SliderView setSubSelect={setSubSelect}>
        <Slider
          {...settings}
          afterChange={() => {
            const clickIndex =
              document.getElementsByClassName('slick-active')[0];
            setSubSelect(clickIndex.dataset.index);
          }}
        >
          <div>
            <img alt="1" src={LandingImage01} />
          </div>
          <div>
            <img alt="2" src={LandingImage02} />
          </div>
          <div>
            <img alt="3" src={LandingImage03} />
          </div>
          <div>
            <img alt="4" src={LandingImage04} />
          </div>
        </Slider>
      </SliderView>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  width: 460px;
  overflow: hidden;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const SliderDots = styled.div``;
const SliderView = styled.div`
  div {
    width: 100%;
    display: inline-block;
  }

  img {
    margin-top: 20px;
    width: 100%;
    line-height: 300px;
    max-height: 300px;
    margin-bottom: 10px;
    position: relative;
    text-align: center;
    user-select: none;
    @media ${(props) => props.theme.mobile} {
      line-height: 200px;
      max-height: 200px;
    }
  }

  .slickDots li.slick-active button {
    width: 30px;

    &:before {
      background-color: #ffda4f;
      opacity: 1;
      width: 25px;
    }
  }

  .slickDots {
    display: flex !important;
    justify-content: center;
    z-index: 999;

    li {
      list-style: none;
      position: relative;
      display: inline-block;
      padding: 0;
      cursor: pointer;

      button {
        border: 0;
        background: transparent;
        display: block;
        height: 20px;
        width: 20px;
        outline: none;
        line-height: 0;
        font-size: 0;
        color: transparent;
        padding: 5px;
        cursor: pointer;

        &:before {
          position: absolute;
          top: 25px;
          left: 0;
          content: '';
          width: 15px;
          height: 15px;
          background-color: #b7b7b7;
          border-radius: 30px;

          @media ${(props) => props.theme.mobile} {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
`;
