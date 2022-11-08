import React, { useEffect } from 'react';
// >>>>>>>>>>>>>>>> GA TEST
import ReactGA from 'react-ga';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Explanation from './explanation/index';
import Product from './product/index';
import Guide from './guide/index';
import Question from './questions/index';
import { popupPay } from './product/item';

function Index() {
  const pay = useSelector((state) => state.user.pay);
  const dispatch = useDispatch();
  const history = useHistory();
  const payStore = useSelector((state) => state.payment);

  useEffect(() => {
    window.scrollTo(0, 0);
    // >>>>>>>>>>>>>>>>>>>> GA TEST
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  }, []);

  return (
    <Container>
      <Explanation />
      <Product />
      <Guide />
      <Question />
      <Experience
        value="꿀벌셀러 14일 무료체험 하기"
        type="button"
        // 결재 재개발전까지 임시 주석처리
        // disabled={pay && pay.status === 'PENDING_CANCEL'}
        // 결재 재개발전까지 버튼 숨기기
        disabled
        onClick={() =>
          popupPay(
            payStore.productData[0].lid[0],
            payStore.stepPayPid[0],
            dispatch,
            history,
            payStore.productData[0],
            pay,
          )
        }
      />
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.2) 30.76%,
    rgba(255, 215, 115, 0.195279) 96.82%
  );
`;
const Experience = styled.input`
  position: sticky;
  position: webkit-sticky;
  bottom: 15px;
  width: 45%;
  min-width: 300px;
  max-width: 500px;
  height: 50px;
  border-radius: 25px;
  background: #3c3c3c;
  color: #fff;
  font-size: 12pt;
  margin-bottom: 30px;

  :disabled {
    display: none;
    background-color: #eaeaea;
    color: #747474;

    :hover {
      background-color: #eaeaea;
      cursor: default;
    }
  }
`;
