import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { Tabs } from 'antd';
// >>>>>>>>>>>>>>>> GA TEST
import ReactGA from 'react-ga';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
import CategorySection from './category';
import CategoryChart from './popular/category';
import KeywordChart from './popular/keyword';
import TrandChart from './trand-chart/trand/index';
import { unsetCategory } from './category/reducer';

const { TabPane } = Tabs;

function Index() {
  const dispatch = useDispatch();
  const { selectReal } = useSelector((state) => state.discover);

  useEffect(() => {
    // >>>>>>>>>>>>>>>>>>>> GA TEST
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    return () => {
      dispatch(unsetCategory());
    };
  }, []);

  return (
    <Container>
      <CategorySection />
      {selectReal.id && (
        <StyledTabs defaultActiveKey="1">
          <TabPane tab="인기 차트" key="1" style={{ textAlign: 'center' }}>
            <CategoryChart />
            <KeywordChart />
          </TabPane>
          <StyledPane tab="트렌드 차트" key="2" disabled>
            <TrandChart />
          </StyledPane>
        </StyledTabs>
      )}
    </Container>
  );
}

export default Index;

const Container = styled.div`
  margin: 1.2em 6.5em;
  min-height: 63vh;

  .tooltip-keyword {
    padding: 0.6em 1.2em;
    font-weight: 500;
    font-size: 0.85em;
    border-radius: 1em;
    opacity: 0.88 !important;
  }

  > .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
    width: 95%;
  }
  > .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list > .ant-tabs-tab {
    width: 95%;
  }

  .ant-tabs-top > .ant-tabs-nav::before,
  .ant-tabs-bottom > .ant-tabs-nav::before,
  .ant-tabs-top > div > .ant-tabs-nav::before,
  .ant-tabs-bottom > div > .ant-tabs-nav::before {
    border-bottom: none;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    margin: 0 auto;
    color: black;
    font-size: 1.1em;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn .ant-tabs-tab-btn,
  .ant-tabs-tab-btn {
    margin: 0 auto;
    font-size: 1.1em;
  }

  @media ${(props) => props.theme.mobile} {
    margin: 0.5em;
    .ant-tabs-nav {
      display: none;
    }
  }
`;

const StyledTabs = styled(Tabs)`
  overflow: visible;
`;

const StyledPane = styled(TabPane)``;
