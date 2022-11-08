import React from 'react';
import styled from 'styled-components';

import { Tabs } from 'antd';
import {
  BulbTwoTone,
  TagsTwoTone,
  ThunderboltTwoTone,
} from '@ant-design/icons';

import RecommendKeyword from './recommend-keyword';
import NamingLogic from './naming-logic';
import AttributeKeyword from './attribute-keyword';
import SaveNaming from './save-naming';

const { TabPane } = Tabs;

export default function Index() {
  return (
    <Container>
      <TabContainer>
        <StyleTabs
          type="card"
          defaultActiveKey="1"
          size="small"
          id="searchProdutname"
        >
          <TabPane
            tab={
              <TabText>
                <BulbTwoTone twoToneColor="#FFC83A" />
                추천 키워드
              </TabText>
            }
            key="1"
          >
            <RecommendKeyword />
          </TabPane>
          <TabPane
            tab={
              <TabText>
                <ThunderboltTwoTone twoToneColor="#FFC83A" />
                상품명 로직
              </TabText>
            }
            key="2"
          >
            <NamingLogic />
          </TabPane>
          <TabPane
            tab={
              <TabText>
                <TagsTwoTone twoToneColor="#FFC83A" />
                노출 키워드
              </TabText>
            }
            key="3"
          >
            <AttributeKeyword />
          </TabPane>
        </StyleTabs>
      </TabContainer>
      <SaveNaming />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0 6.5em; */
  margin: 0 6.5em;
  min-height: 62vh;
  .ant-input-affix-wrapper {
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
    box-shadow: none;
    background-color: ${({ theme }) => theme.colors.white};
    :focus,
    :hover {
      outline: none;
      box-shadow: none;
    }
  }
`;

const TabContainer = styled.div`
  width: 100%;
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.black};
  }
  .ant-tabs-tab-btn {
    :active,
    :focus,
    :hover {
      color: ${({ theme }) => theme.colors.black};
    }
  }
  .ant-tabs-tab {
    :hover,
    :focus {
      text-shadow: 0 0 0.25px currentColor;
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const StyleTabs = styled(Tabs)`
  overflow: visible;
`;

const TabText = styled.span`
  font-size: 0.8rem;
`;
