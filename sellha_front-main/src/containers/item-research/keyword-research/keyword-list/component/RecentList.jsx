/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { getSearchHistory, removeSearchHistory } from 'http-api';
import { List } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import SaveBtnComponent from 'components/KeywordSaveBtn';
import { searchClickEvent, ListHeader } from './Common';
import {
  RecentDiv,
  RecentTitle,
  TableDiv,
  SCard,
  SaveButtonHead,
  RecentKeyword,
  RecentCompete,
  RecentProductAmount,
  RecentSearchAmount,
  DeleteButton,
} from '../style';

function index() {
  const [RecentHistory, setRecentHistory] = useState([]);

  const asyncRecent = async () => {
    try {
      const searchHistory = await getSearchHistory();
      setRecentHistory(searchHistory);
    } catch (error) {
      setRecentHistory([]);
    }
  };

  useEffect(() => {
    asyncRecent();
  }, []);

  return (
    <RecentDiv>
      <RecentTitle>최근 검색 키워드</RecentTitle>
      <TableDiv>
        <List
          header={<ListHeader />}
          dataSource={RecentHistory}
          renderItem={(item) => (
            <SCard
              key={item._id}
              hoverable={false}
              bodyStyle={{
                display: 'flex',
                flex: 1,
                padding: '0 1.4em',
              }}
            >
              <SaveButtonHead>
                <SaveBtnComponent item={item} />
              </SaveButtonHead>
              <RecentKeyword
                onClick={() => {
                  searchClickEvent(item.keyword);
                }}
              >
                {item.keyword || '-'}
              </RecentKeyword>
              <RecentCompete
                className="hidden"
                onClick={() => {
                  searchClickEvent(item.keyword);
                }}
              >
                {item.compete >= 0 && item.compete}
                {(!item.compete || item.compete < 0) && '-'}
              </RecentCompete>
              <RecentSearchAmount
                onClick={() => {
                  searchClickEvent(item.keyword);
                }}
              >
                {(item.searchAmount && item.searchAmount.toLocaleString()) ||
                  '-'}
              </RecentSearchAmount>
              <RecentProductAmount
                onClick={() => {
                  searchClickEvent(item.keyword);
                }}
              >
                {(item.productAmount && item.productAmount.toLocaleString()) ||
                  '-'}
              </RecentProductAmount>
              <DeleteButton
                onClick={async (e) => {
                  e.stopPropagation();
                  await removeSearchHistory(item.id);
                  asyncRecent();
                }}
              >
                <CloseOutlined />
              </DeleteButton>
            </SCard>
          )}
        />
      </TableDiv>
    </RecentDiv>
  );
}

export default index;
