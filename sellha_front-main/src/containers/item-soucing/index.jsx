import React, { useEffect } from 'react';
// >>>>>>>>>>>>>>>> GA TEST
import ReactGA from 'react-ga';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
import styled from 'styled-components';
import TopContainer from './top-sourcing/index';
import BottomContainer from './bottom-sourcing/index';

function Index() {
  useEffect(() => {
    document.title = `셀링하니`;
    // >>>>>>>>>>>>>>>>>>>> GA TEST
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  }, []);
  return (
    <Container>
      <TopContainer />
      <BottomContainer />
    </Container>
  );
}

export default Index;

const Container = styled.div`
  width: 100%;
`;
