/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tabs } from 'antd';
import ReactGA from 'react-ga';
import { getKeywordData, getAdultKeywordData } from 'http-api';
import Spiner from 'components/spiner';
import { failData, fetchData, setData, unsetData } from './reducer';
import SearchComponent from './component/Search';
import ResearchResult from './research-result';
import TrendMonitoring from './trend';
import TopProduct from './top-product';
import RelatedKeyword from './related-keyword';
import RecentList from './keyword-list/index';

const { TabPane } = Tabs;

export default function SearchPage() {
  // 주소 parameter
  const param = new URLSearchParams(window.location.search);
  const searchKeyword = param.get('keyword');
  const tab = param.get('tab');

  const dispatch = useDispatch();
  const history = useHistory();
  const keywordSearch = useSelector((state) => state.keywordSearch);

  const asyncSearch = async (keyword) => {
    try {
      const { result } = await getAdultKeywordData(keyword);
      if (!result) {
        const data = await getKeywordData(keyword);
        dispatch(setData(data));
        return;
      }
      dispatch(failData());
      alert(
        `'${keyword}' 키워드가 성인 키워드로 감지되어 검색할 수 없습니다 😰`,
      );
      history.push('/keyword');
    } catch (error) {
      dispatch(failData());
      alert('키워드 데이터를 불러올 수 없습니다.');
      document.title = `셀링하니`;
      history.push('/keyword');
    }
  };

  useEffect(() => {
    // >>>>>>>>>>>>>>>>>>>> GA TEST
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return () => {
      dispatch(unsetData());
    };
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      const keyword = searchKeyword.trim();
      dispatch(unsetData());

      if (keyword !== null) {
        document.title = `${keyword}`;
        dispatch(fetchData());
        asyncSearch(keyword);
      }
    } else {
      dispatch(unsetData());
    }
  }, [searchKeyword]);

  return (
    <Container>
      <SearchComponent searchKeyword={searchKeyword} />
      {!searchKeyword && <RecentList />}
      {keywordSearch.loading && tab * 1 !== 4 && (
        <SpinerDiv>
          <Spiner loading={keywordSearch.loading} info="키워드 검색 중..." />
        </SpinerDiv>
      )}
      {!keywordSearch.loading && searchKeyword && (
        <ResearchContainer>
          <StyledTabs
            activeKey={tab}
            onTabClick={(activeKey) => {
              param.set('tab', activeKey);
              history.push(`/keyword?${param.toString()}`);
            }}
          >
            <StyledPane tab="분석 결과" key="1">
              <ResearchResult param={param} />
            </StyledPane>
            <StyledPane tab="Top 상품 리스트" key="2">
              <TopProduct />
            </StyledPane>
            <StyledPane tab="연관 키워드" key="3">
              <RelatedKeyword />
            </StyledPane>
            <StyledPane tab="트렌드 피드" key="4">
              <TrendMonitoring searchKeyword={searchKeyword} />
            </StyledPane>
          </StyledTabs>
        </ResearchContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  min-height: 62vh;
  margin: 1.2em 6.5em;
  @media ${(props) => props.theme.mobile} {
    align-items: center;
    margin: 2%;

    .hidden {
      display: none;
    }
  }
`;

const ResearchContainer = styled.div`
  margin-top: 2%;
  @media ${(props) => props.theme.mobile} {
    margin-top: 0;
  }
  .ant-tabs-nav-wrap {
    border-bottom: 0.15em solid ${(props) => props.theme.colors.lineGray};
  }

  > .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
  }
  > .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list > .ant-tabs-tab {
    width: 22%;
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
    @media ${(props) => props.theme.mobile} {
      font-size: 14px;
    }
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn .ant-tabs-tab-btn,
  .ant-tabs-tab-btn {
    margin: 0 auto;
    font-size: 1.1em;
    @media ${(props) => props.theme.mobile} {
      font-size: 14px;
    }
  }
  .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-operations {
    display: none;
  }
`;

const StyledTabs = styled(Tabs)`
  overflow: visible;
`;

const StyledPane = styled(TabPane)``;

const SpinerDiv = styled.div`
  display: flex;
  height: 65vh;
  justify-content: center;
  align-items: center;
`;
