import React, { useEffect } from 'react';
import styled from 'styled-components';
import useWindowSize from 'hooks/useWindowSize';

import Popup from './popup';
import Intro from './intro/index';
import Recommend from './recommend/index';
import Reason from './reason/index';
import Function from './function/index';
import Coming from './coming/index';
import Trial from './trial/index';
import Question from './question/index';

function Index() {
  const WindowSize = useWindowSize();

  useEffect(() => {
    localStorage.setItem('loginAlert', false);
  }, []);

  return (
    <Container>
      {WindowSize.width >= 770 && <Popup />}
      <Intro />
      <Recommend />
      <Reason />
      <Function />
      <Coming />
      <Trial />
      <Question />
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
