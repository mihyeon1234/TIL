import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';

import { getCategoryFullPath } from 'http-api';
import replaceParam from 'components/keyword';
import ProgressBar, { IndicatorIcon, TipBox } from 'components/ProgressBar';
import Excel from 'components/excel';
import { setPagination, setRowData, unsetRowData } from '../reducer';

const TableComponent = ({ customColumn, rowSelection, keyword }) => {
  const [tip, setTip] = useState('');
  const [filterDatas, setFilterDatas] = useState([]);
  const dispatch = useDispatch();
  const {
    loading,
    pagination,
    filter,
    filteredInfo,
    loadingRow,
    rowSelect,
    relatedData,
    originData,
  } = useSelector((state) => state.relatedKeyword);
  const { categoryName, source } = filteredInfo;

  const getRowData = async (rowData, index) => {
    dispatch(unsetRowData(index));
    try {
      const crawlingData = await getCategoryFullPath(rowData.relKeyword);

      const {
        categoryShare,
        compIdx,
        compete,
        exposedCount,
        productAmount,
        searchAmount,
      } = crawlingData;

      const categorys =
        categoryShare.length > 0 ? categoryShare[0].fullPath : '-';

      const filterCategory = Array.isArray(categorys)
        ? categorys
        : categorys.split(' > ').pop();

      const data = {
        categoryName: filterCategory,
        compIdx,
        compete: compete < 0 ? '-' : compete,
        exposedCount,
        fullPath: categorys,
        productAmount,
        relKeyword: rowData.relKeyword,
        searchAmount,
        source: rowData.source,
      };
      dispatch(setRowData(data, index));
    } catch (error) {
      dispatch(unsetRowData());
    }
  };

  const isVisibleButton = (row, index) => {
    if (row.categoryName === '-' && row.searchAmount === '-') {
      if (loadingRow && rowSelect === index) {
        return (
          <LoadingOutlined
            style={{ color: '#FFC83A', marginRight: '30px', fontSize: '20px' }}
          />
        );
      }
      return <CheckButton>확인하기</CheckButton>;
    }
    return '';
  };

  const columns = [
    {
      title: <LStitle>키워드</LStitle>,
      dataIndex: 'relKeyword',
      width: 180,

      render: (text, row, index) => (
        <KeywordBox>
          <KeywordLink
            onClick={() => {
              window.open(`/keyword?keyword=${replaceParam(text)}&tab=1`);
            }}
          >
            <KeywordText>{text}</KeywordText>
          </KeywordLink>
          {isVisibleButton(row, index)}
        </KeywordBox>
      ),
    },
    {
      title: (
        <>
          <LStitle data-tip data-for="tooltip-source">
            소스
          </LStitle>
          <ReactTooltip
            id="tooltip-source"
            className="tooltip-Top"
            place="top"
            effect="solid"
          >
            <div>네이버의 연관 키워드를 5가지로 분류해 제공합니다.</div>
            <TooltipContent>
              <div>
                <SourceTop>인기</SourceTop>
                <span>
                  해당 키워드가 속한 대표 카테고리의 TOP 50 인기 키워드
                </span>
              </div>
              <div>
                <SourceSearch>통합</SourceSearch>
                <span>네이버 통합 검색의 연관 검색어</span>
              </div>
              <div>
                <SourceShop>쇼핑</SourceShop>
                <span>네이버 쇼핑 검색의 연관 검색어</span>
              </div>
              <div>
                <SourceAd>광고</SourceAd>
                <span>네이버 광고 시스템 키워드 도구의 연관 검색어</span>
              </div>
              <div>
                <SourceProduct>상품</SourceProduct>
                <span>네이버 쇼핑 TOP 100 상품명 키워드</span>
              </div>
            </TooltipContent>
          </ReactTooltip>
        </>
      ),
      // width: '10%',
      dataIndex: 'source',
      responsive: ['lg'],
      render: (sourceData = [], row) => {
        if (sourceData?.length > 0) {
          return (
            <SourceDiv>
              <SourceTitle data-tip data-for={`${row.relKeyword}`}>
                {sourceData.length}개
              </SourceTitle>
              <ReactTooltip
                id={`${row.relKeyword}`}
                place="right"
                effect="solid"
                backgroundColor="white"
                border
                borderColor="#ebebeb"
              >
                {sourceData?.map((tag) => {
                  if (tag === '광고')
                    return <SourceAd key={tag}>{tag}</SourceAd>;
                  if (tag === '쇼핑')
                    return <SourceShop key={tag}>{tag}</SourceShop>;
                  if (tag === '통합')
                    return <SourceSearch key={tag}>{tag}</SourceSearch>;
                  if (tag === '인기')
                    return <SourceTop key={tag}>{tag}</SourceTop>;
                  if (tag === '상품')
                    return <SourceProduct key={tag}>{tag}</SourceProduct>;
                  return <></>;
                })}
              </ReactTooltip>
            </SourceDiv>
          );
        }
        return <></>;
      },
      filters: [
        {
          text: '인기',
          value: '인기',
        },
        {
          text: '통합',
          value: '통합',
        },
        {
          text: '쇼핑',
          value: '쇼핑',
        },
        {
          text: '광고',
          value: '광고',
        },
        {
          text: '상품',
          value: '상품',
        },
      ],
      filteredValue: source || null,
      onFilter: (value, record) => record.source.includes(value),
      sorter: {
        compare: (a, b) => a.source.length - b.source.length,
      },
    },
    {
      title: <CStitle>카테고리 </CStitle>,
      dataIndex: 'categoryName',
      // width: '11%',
      align: 'center',
      render: (text, row) => (
        <>
          <CategoryName data-tip data-for={`${row.relKeyword}_category`}>
            {text}
          </CategoryName>
          <ReactTooltip
            id={`${row.relKeyword}_category`}
            place="right"
            effect="solid"
          >
            <span>{row.fullPath}</span>
          </ReactTooltip>
        </>
      ),
      filters: filter,
      filteredValue: categoryName || null,
      onFilter: (value, record) => record.categoryName === value,
      // onFilterDropdownVisibleChange: () => setVisibleAlert(false),
    },
    {
      title: <CStitle>광고 경쟁 강도</CStitle>,
      dataIndex: 'compIdx',
      // width: '10%',
      responsive: ['lg'],
      align: 'center',
      render: (text, row) => `${row.compIdx}`,
    },
    {
      title: (
        <>
          <CStitle data-tip data-for="tooltip-competive">
            경쟁률
          </CStitle>
          <ReactTooltip
            id="tooltip-competive"
            className="tooltip-Top"
            place="top"
            effect="solid"
          >
            상품수 대비 검색수가 많을수록 경쟁정도 수치가 높습니다.
          </ReactTooltip>
        </>
      ),
      dataIndex: 'compete',
      align: 'center',
      // width: '10%',
      responsive: ['lg'],

      render: (text) => text?.toLocaleString(),
      sorter: {
        compare: (a, b) => a.compete - b.compete,
      },
    },
    {
      title: (
        <>
          <CStitle data-tip data-for="tooltip-topcount">
            노출 횟수
          </CStitle>
          <ReactTooltip
            id="tooltip-topcount"
            className="tooltip-Top"
            place="top"
            effect="solid"
          >
            네이버 쇼핑 상위 100개 상품의 상품명으로 노출된 횟수입니다.
          </ReactTooltip>
        </>
      ),
      dataIndex: 'exposedCount',
      align: 'center',
      // width: '10%',
      responsive: ['lg'],
      defaultSortOrder: 'descend',
      render: (text) => text?.toLocaleString(),
      sorter: {
        compare: (a, b) => {
          const splitCount = (text) => text.exposedCount.split('/')[0];
          return splitCount(a) - splitCount(b);
        },
      },
    },
    {
      title: <CStitle>월간 검색수</CStitle>,
      dataIndex: 'searchAmount',
      align: 'center',
      // width: '15%',

      render: (text) => text?.toLocaleString(),
      sorter: {
        compare: (a, b) => a.searchAmount - b.searchAmount,
      },
    },
    {
      title: <CStitle>상품수</CStitle>,
      dataIndex: 'productAmount',
      align: 'center',
      // width: '15%',

      render: (text) => text?.toLocaleString(),
      sorter: {
        compare: (a, b) => a.productAmount - b.productAmount,
      },
    },
  ];

  useEffect(() => setFilterDatas(relatedData), [relatedData]);

  return (
    <>
      <Excel
        keyword={keyword}
        rowData={filterDatas}
        header={columns}
        service="추천키워드"
      />
      <TableBox>
        <ProgressBar isAnimating={loading} setTip={setTip} />
        <TableBody
          rowKey={(row) => row.relKeyword}
          columns={customColumn ? [...customColumn, ...columns] : columns}
          dataSource={relatedData}
          sticky="true"
          loading={{
            indicator: <></>,
            spinning: loading,
            tip: (
              <>
                <IndicatorIcon />
                <TipBox>{tip}</TipBox>
              </>
            ),
          }}
          showSorterTooltip={false}
          showSizeChanger
          pagination={{
            ...pagination,
            locale: { items_per_page: '개씩 보기' },
            size: 'small',
            position: ['bottomCenter'],
          }}
          onRow={(rowData, index) => ({
            onClick: () =>
              rowData.categoryName === '-' &&
              rowData.searchAmount === '-' &&
              getRowData(rowData, index),
          })}
          onChange={(page, filters, sorter, { currentDataSource }) => {
            if (
              filters.categoryName?.length > 0 ||
              filters.source?.length > 0
            ) {
              dispatch(setPagination(page, filters, originData));
            } else {
              dispatch(setPagination(page, filters, currentDataSource));
            }
            setFilterDatas(currentDataSource);

            const element = document.getElementById('result');
            element.scrollIntoView({
              alignToTop: 'true',
              behavior: 'smooth',
            });
          }}
          rowSelection={rowSelection}
          locale={{
            filterConfirm: '적용',
            filterReset: '초기화',
            filterEmptyText: '결과가 없습니다.',
            emptyText:
              !loading &&
              '키워드를 입력하면 추천 키워드 결과를 볼 수 있습니다.',
          }}
        />
      </TableBox>
    </>
  );
};

export default TableComponent;

const TableBody = styled(Table)`
  .ant-table-content {
    /* IE and Edge */
    -ms-overflow-style: none;
    /* Firefox */
    scrollbar-width: none;
    ::-webkit-scrollbar {
      bottom: 0;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background-color: transparent;
      background-clip: padding-box;
      border: 1px solid transparent;
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.089);
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
      display: none;
    }
  }

  & thead > tr:nth-child(1) > th {
    font-size: 0.85em;
    background: ${(props) => props.theme.colors.white};
    border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
    text-align: center;
    padding: 8px 16px;
    .tooltip-Top {
      margin-top: -15px;
      font-size: 0.95em;
    }
  }
  .ant-table-cell {
    .ant-table-filter-column > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
    }
    /* .ant-table-column-sorters > span {
      justify-content: center;
      display: table;
      margin-left: auto;
    } */
    /* .ant-table-column-sorters > span > span {
      width: 20px;
    } */
    ::before {
      background-color: transparent !important;
    }
  }

  .ant-table-filter-trigger-container {
    background: #fff;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    font-size: 0.85em;
    border-radius: 0.75em;
    padding: 0.25em 1em;
    height: 2.5em;
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover,
  .ant-table-thead th.ant-table-column-sort {
    background: #fff;
  }

  .ant-table-column-sorter-up.active,
  .ant-table-column-sorter-down.active {
    color: #646464;
  }

  .ant-table-filter-trigger:hover {
    background: #fff;
  }

  table > tbody.ant-table-tbody {
    font-size: 0.95em;
  }

  table > tbody.ant-table-tbody > tr > td {
    font-size: 0.95em;
    padding: 0.9em 0.5em;
    height: 55px;
    cursor: pointer;
  }

  .ant-pagination-item-active {
    border: none;
    font-weight: bolder;
  }

  .ant-pagination.mini.ant-table-pagination.ant-table-pagination-center {
    @media ${(props) => props.theme.mobile} {
      margin: 1.5em 0;
    }
  }

  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link,
  .ant-pagination-item {
    border: none;
  }

  .ant-table-pagination.ant-pagination {
    margin: 3em 0;
    align-items: center;
  }

  .ant-table-pagination-right {
    justify-content: center;
  }

  .ant-table-thead > tr > th:nth-child(2),
  .ant-table-tbody > tr > td:nth-child(2) {
    width: 8%;
  }

  .ant-table-tbody > tr > td:nth-child(4) {
    min-width: 91px;
  }

  @media ${(props) => props.theme.mobile} {
    table > tbody.ant-table-tbody {
      font-size: 0.85em;
    }
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td,
    .ant-table tfoot > tr > th,
    .ant-table tfoot > tr > td {
      padding: 15px 5px;
    }
  }

  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link,
  .ant-pagination-item {
    font-size: 13px;
    padding: 0;
    margin: 0;
  }

  .ant-table-pagination-right {
    padding: 20px 3px;
  }

  .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    margin-top: 2.5em;
  }
`;

const LStitle = styled.div`
  font-weight: 700;
  text-align: left;
  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;

const CStitle = styled.div`
  font-weight: 700;
  text-align: center;
  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > div {
    padding: 3px 0;
    > span:nth-child(2) {
      padding-left: 5px;
    }
  }
`;

const SourceDiv = styled.div`
  margin-left: 10px;
`;

const SourceTitle = styled.span`
  border-radius: 0.12em;
  font-size: 0.7rem;
  padding: 1px 5px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  /* color: ${({ theme }) => theme.colors.darkGray}; */
  /* border: 1px solid ${({ theme }) => theme.colors.darkGray}; */
  cursor: pointer;
`;

const Source = styled.span`
  position: relative;
  left: 3px;
  padding: 1px 5px;
  text-align: center;
  border-radius: 2px;
  font-size: 10px;
  font-weight: 600;
  margin-right: 3px;
  line-height: 4px;
`;

const SourceProduct = styled(Source)`
  color: #f387c8; /* #bb87f3; */
  border: 1px solid #ffdff1; /* #e3d7f5; */
`;

const SourceTop = styled(Source)`
  color: #f38680;
  border: 1px solid #ffe3e1;
`;

const SourceShop = styled(Source)`
  color: #51d7a2;
  border: 1px solid #caf7e5;
`;

const SourceAd = styled(Source)`
  color: #7bcbea;
  border: 1px solid #d1eef9;
`;

const SourceSearch = styled(Source)`
  color: #ffa638;
  border: 1px solid #f5dcbe;
`;

const KeywordBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

const KeywordLink = styled.div`
  font-size: 0.95em;
  width: 115px;

  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;

const KeywordText = styled.span`
  width: fit-content;
  :hover {
    cursor: pointer;
    background: linear-gradient(
      to top,
      rgb(255, 222, 135) 35%,
      transparent 35%
    );
  }
`;

const CategoryName = styled.span`
  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;

const CheckButton = styled.button`
  width: 75px;
  font-size: 0.73rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background: ${({ theme }) => theme.colors.white};
  padding: 5px 3px;
  :hover,
  :focus {
    background: ${({ theme }) => theme.colors.white};
  }
`;

const TableBox = styled.div`
  /* padding: 0 1.2em; */
`;
