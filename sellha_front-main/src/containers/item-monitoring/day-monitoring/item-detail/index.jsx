import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Tabs } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';

import { getItemDetail, getItems } from 'http-api';
import Spiner from 'components/spiner';
import { failData } from '../reducer';
import {
  fetchDetail,
  setDetail,
  failDetail,
  setSelect,
  unsetSelect,
} from './reducer';
import InfoCard from './info';
import KeywordMonitoring from './keyword';
import ReviewMonitoring from './review';

const { TabPane } = Tabs;

const tabData = [
  {
    key: '1',
    id: 'tooltipKeyword',
    title: '키워드 모니터링',
    description: `스마트스토어에서 판매 중인 상품의 순위를 매일 추적합니다.`,
  },
  {
    key: '2',
    id: 'tooltipReview',
    title: '리뷰 모니터링',
    description: `이 상품의 전체 리뷰 평점과 내용을 확인할 수 있습니다.`,
  },
];

const Tab = ({ id, title, description }) => (
  <>
    {title}
    <QuestionCircle data-tip data-for={id} />
    <ReactTooltip id={id} className="tooltipCSS" place="top" effect="solid">
      {description}
    </ReactTooltip>
  </>
);

export default function index({ match }) {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.dayMonitoring);
  const { loading, success } = useSelector((state) => state.monitoringDetail);

  const asyncItemDetail = async () => {
    dispatch(fetchDetail());
    try {
      const result = await getItemDetail(match.params.pid);
      dispatch(setDetail(result.result));
    } catch (error) {
      dispatch(failDetail());
    }
  };

  const getItemsData = async (productId) => {
    try {
      const { results } = await getItems();

      const selectedData = results.products.find(
        (item) => item.product_id === productId,
      );
      dispatch(setSelect(selectedData));
      asyncItemDetail();
    } catch (error) {
      dispatch(failData());
    }
  };

  useEffect(() => {
    const productId = match.params.pid;
    if (items.length === 0) {
      getItemsData(productId);
    } else {
      const selectedData = items.find((item) => item.product_id === productId);
      dispatch(setSelect(selectedData));
      asyncItemDetail();
    }
    return () => {
      dispatch(unsetSelect());
    };
  }, []);

  if (loading) {
    return (
      <LoadingDiv>
        <Spiner loading={loading} />
      </LoadingDiv>
    );
  }

  if (!success) {
    return (
      <LoadingDiv>
        <Spiner loading={loading} />
      </LoadingDiv>
    );
  }

  return (
    <Container>
      <InfoCard />
      <StyledTabs defaultActiveKey="1">
        {tabData.map(({ key, id, title, description }) => (
          <TabPane
            key={id}
            tab={<Tab id={id} title={title} description={description} />}
          >
            {key === '1' && <KeywordMonitoring />}
            {key === '2' && <ReviewMonitoring />}
          </TabPane>
        ))}
      </StyledTabs>
    </Container>
  );
}

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const StyledTabs = styled(Tabs)`
  overflow: visible;
`;

const Container = styled.div`
  margin: 1em 6.5em;
  min-height: 85vh;
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
  .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab {
    width: 50%;
    height: 100%;
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
  .ant-tabs-nav > .ant-tabs-nav-wrap {
    transform: none;
    > .ant-tabs-nav-list {
      transform: none !important;
    }
  }
  .tooltipCSS {
    font-size: 0.7em;
    font-weight: 300;
    border-radius: 1em;
  }
  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations,
  .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-operations {
    display: none;
  }
`;

const QuestionCircle = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.25em;
`;
