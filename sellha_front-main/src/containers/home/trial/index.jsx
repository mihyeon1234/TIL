import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Index() {
  const history = useHistory();
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Container>
      <div data-aos="fade-up" data-aos-offset="400" data-aos-easing="ease-out">
        <span>일단 한번 체험해보세요.</span>
        <input
          type="button"
          onClick={() => history.push('/payment')}
          value="무료로 시작해보기"
        />
      </div>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  background-color: #ffffff;
  padding: 100px 0;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  span {
    border-bottom: 2px solid #000000;
    height: 65px;
    font-size: 36px;
    font-weight: bold;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.8em;
      height: 45px;
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
