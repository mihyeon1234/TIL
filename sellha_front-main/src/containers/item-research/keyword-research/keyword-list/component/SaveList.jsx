/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { List, Pagination } from 'antd';
import SaveBtnComponent from 'components/KeywordSaveBtn';
import styled from 'styled-components';
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
} from '../style';

function index() {
  const { saveBucket } = useSelector((state) => state.user);

  const [saveItems, setSaveItems] = useState([]);
  const [page, setPage] = useState(1);

  const onPageChange = (_page) => {
    setPage(_page);
  };

  useEffect(() => {
    const sliceBucketKeywords = saveBucket?.keywords?.slice(
      (page - 1) * 10,
      (page - 1) * 10 + 10,
    );
    setSaveItems(
      sliceBucketKeywords?.length === 0
        ? setPage((prev) => (prev === 1 ? 1 : prev - 1))
        : sliceBucketKeywords,
    );
  }, [page, saveBucket]);

  return (
    <RecentDiv className="hidden">
      <RecentTitle>저장 키워드</RecentTitle>
      <TableAndPagination>
        <TableDiv>
          <List
            header={<ListHeader />}
            dataSource={saveItems}
            renderItem={(item) => (
              <SCard
                key={item._id}
                // hoverable={false}
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
                  {(item.productAmount &&
                    item.productAmount.toLocaleString()) ||
                    '-'}
                </RecentProductAmount>
              </SCard>
            )}
          />
        </TableDiv>
        <PaginationResult
          size="small"
          current={page}
          defaultCurrent={1}
          defaultPageSize={10}
          total={saveBucket?.keywords?.length}
          onChange={onPageChange}
        />
      </TableAndPagination>
    </RecentDiv>
  );
}

export default index;
const TableAndPagination = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PaginationResult = styled(Pagination)`
  margin-top: 1em;
  .ant-pagination-options {
    display: none;
  }

  .ant-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    font-size: 0.8rem;
  }

  .ant-pagination-item-active {
    border: none;
  }
`;
