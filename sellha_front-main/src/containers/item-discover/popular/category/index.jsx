/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Table, Button, Drawer } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';
import useWindowSize from 'hooks/useWindowSize';
import { fetchSubCategory } from 'http-api';
import SaveBtnComponent from 'components/KeywordSaveBtn';
import Excel from 'components/excel';
import getSearchFilter from './filter';
import { failData, fetchData, setData, unsetFilter } from './reducer';
import { DetailData, StateTag, TagDiv } from '../style/index';
import { DiscoverTooltip, getAntonymText, getSynonymText } from '../component';

export default function ChartPage() {
  const dispatch = useDispatch();
  const WindowSize = useWindowSize();
  const { selectReal } = useSelector((state) => state.discover);
  const { data, loading, lastUpdated } = useSelector(
    (state) => state.categorySub,
  );

  const [VisibleDraw, setVisibleDraw] = useState(false);
  const [VisibleFilter, setVisibleFilter] = useState(false);

  const fetchChart = async () => {
    try {
      const result = await fetchSubCategory({
        selectCategory: selectReal,
        categoryName: selectReal.name,
      });

      dispatch(
        setData({
          data: result.chart,
          lastUpdated: result.lastUpdated,
        }),
      );
    } catch (error) {
      dispatch(failData());
    }
  };

  useEffect(() => {
    document.title = `셀링하니`;
    if (!selectReal.id) {
      return;
    }
    setVisibleDraw(false);
    dispatch(unsetFilter());
    dispatch(fetchData());
    fetchChart();
  }, [selectReal]);

  const columns = [
    {
      title: <TableTitleDiv>저장</TableTitleDiv>,
      width: '6%',
      align: 'center',
      fixed: 'left',
      responsive: ['lg'],
      render: (row) => <SaveBtnComponent item={row} />,
    },
    {
      title: <LeftTitleDiv>카테고리</LeftTitleDiv>,
      dataIndex: 'categoryName',
      fixed: 'left',
      width: '10%',
      render: (text) => {
        if (!text);
        return <KeywordLink>{text}</KeywordLink>;
      },
    },
    {
      title: <LeftTitleDiv>전체 카테고리</LeftTitleDiv>,
      dataIndex: 'fullPath',
      width: '20%',
      responsive: ['lg'],
      render: (text) => <CategoryLink>{text}</CategoryLink>,
    },
    {
      title: (
        <>
          <TableTitleDiv data-tip data-for="tooltipTotalCount">
            경쟁률
          </TableTitleDiv>
          <DiscoverTooltip
            tooltipId="tooltipTotalCount"
            totalCount={data[0]?.totalCount}
          />
        </>
      ),
      dataIndex: 'competitiveness',
      align: 'center',
      width: '8%',
      defaultSortOrder: 'ascend',
      ...getSearchFilter('competitiveness'),
      sorter: {
        compare: (a, b) => a.competitiveness - b.competitiveness,
      },
      render: (text, row) => {
        if (!text || !row.competeText) {
          return <div>-</div>;
        }

        const competeText = getAntonymText(row.competeText);
        return (
          <TagDiv data-tip data-for={row._id}>
            <StateTag data-type={competeText.type}>{competeText.text}</StateTag>
            <DetailData>
              상위 {row.competePercentage - 4} ~{row.competePercentage}%
            </DetailData>
          </TagDiv>
        );
      },
    },
    {
      title: (
        <>
          <TableTitleDiv data-tip data-for="tooltipTotalCount">
            클릭지수
          </TableTitleDiv>
          <DiscoverTooltip
            id="tooltipTotalCount"
            place="top"
            effect="solid"
            backgroundColor="white"
            border
            borderColor="#ebebeb"
          >
            전체 카테고리 {data[0]?.totalCount?.toLocaleString()}개 기준으로,
            <br />
            비율이 낮을수록 경쟁이 낮은 카테고리입니다.
          </DiscoverTooltip>
        </>
      ),
      dataIndex: 'clickSum',
      align: 'center',
      width: '7%',
      ...getSearchFilter('clickSum'),
      sorter: {
        compare: (a, b) => a.clickSum - b.clickSum,
      },
      render: (text, row) => {
        if (!text || !row.clickSumText) {
          return <div>-</div>;
        }

        const clickSumText = getSynonymText(row.clickSumText);
        // eslint-disable-next-line react/destructuring-assignment
        return (
          <TagDiv data-tip data-for={row.categoryId}>
            <StateTag data-type={clickSumText.type}>
              {clickSumText.text}
            </StateTag>
            <DetailData>
              상위 {row.clickSumPercentage - 4} ~{row.clickSumPercentage}%
            </DetailData>
          </TagDiv>
        );
      },
    },
    {
      title: <TableTitleDiv>상품수</TableTitleDiv>,
      dataIndex: 'productAmount',
      align: 'center',
      width: '7%',
      ...getSearchFilter('productAmount'),
      sorter: {
        compare: (a, b) => a.productAmount - b.productAmount,
      },
      render: (text) => {
        if (!text) {
          return '-';
        }
        return (
          <ProductAmount>{parseInt(text, 10).toLocaleString()}</ProductAmount>
        );
      },
    },
    {
      title: <TableTitleDiv>성장성</TableTitleDiv>,
      dataIndex: 'potential',
      width: '7%',
      align: 'center',
      render: (text) => {
        if (!text) {
          return '-';
        }
        return text;
      },
      filters: [
        { text: '상승', value: '상승' },
        { text: '유지', value: '유지' },
        { text: '하락', value: '하락' },
      ],
      onFilter: (value, record) => record.potential === value,
    },
    {
      title: <TableTitleDiv>계절성</TableTitleDiv>,
      dataIndex: 'seasonal',
      width: '7%',
      align: 'center',
      render: (text) => {
        if (!text) {
          return '-';
        }
        return <div>{text}월</div>;
      },
      filters: [
        { text: ' 1월 ', value: '1' },
        { text: ' 2월 ', value: '2' },
        { text: ' 3월 ', value: '3' },
        { text: ' 4월 ', value: '4' },
        { text: ' 5월 ', value: '5' },
        { text: ' 6월 ', value: '6' },
        { text: ' 7월 ', value: '7' },
        { text: ' 8월 ', value: '8' },
        { text: ' 9월 ', value: '9' },
        { text: ' 10월 ', value: '10' },
        { text: ' 11월 ', value: '11' },
        { text: ' 12월 ', value: '12' },
      ],
      onFilter: (value, record) => record.seasonal.split(',').includes(value),
    },
    {
      title: <TableTitleDiv>브랜드 점유율</TableTitleDiv>,
      dataIndex: 'brandful',
      width: '9%',
      align: 'center',
      ...getSearchFilter('brandful'),
      sorter: {
        compare: (a, b) => a.brandful - b.brandful,
      },
      render: (text) => {
        if (!text) {
          return '-';
        }
        return <div>{Math.round(text)}%</div>;
      },
    },
  ];

  return (
    <Container>
      <TableSection visible={VisibleDraw.toString()}>
        <TitleHeader onClick={() => setVisibleDraw((prev) => !prev)}>
          <SubTitleDiv>
            <TitleDiv visible={VisibleDraw.toString()}>카테고리 차트</TitleDiv>
            {lastUpdated && (
              <TableData> {lastUpdated} 데이터 업데이트</TableData>
            )}
          </SubTitleDiv>
          <PopButton visible={VisibleDraw.toString()}>
            {VisibleDraw && <UpOutlined />}
            {!VisibleDraw && <DownOutlined />}
          </PopButton>
        </TitleHeader>
        <TableDraw visible={VisibleDraw.toString()}>
          <ExcelDiv>
            <Excel
              keyword={selectReal.fullPath}
              rowData={data}
              header={columns}
              service="카테고리차트"
            />
          </ExcelDiv>

          {WindowSize.width <= 770 && (
            <SDrawer
              placement="bottom"
              onClose={() => setVisibleFilter(false)}
              visible={VisibleFilter}
            >
              {/* <FilterRows /> */}
            </SDrawer>
          )}
          {WindowSize.width > 770 && (
            <TableFilter visible={VisibleFilter}>
              {/* <FilterRows /> */}
            </TableFilter>
          )}
          <TableBody
            key={selectReal.id}
            columns={columns}
            showSorterTooltip={false}
            rowKey={(record) => record._id}
            dataSource={data}
            loading={loading}
            scroll={{ x: 700 }}
            locale={{
              filterConfirm: '적용',
              filterReset: '초기화',
            }}
            pagination={{
              locale: { items_per_page: '개씩 보기' },
              size: 'small',
              position: ['bottomCenter'],
            }}
            visible={VisibleDraw.toString()}
          />
        </TableDraw>
      </TableSection>
    </Container>
  );
}

const TitleDiv = styled.div`
  font-size: 1.05em;
  font-weight: 600;
  margin-left: 1.5em;
  color: ${(props) =>
    props.visible === 'false'
      ? props.theme.colors.darkGray
      : props.theme.colors.black};
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  .ant-table-filter-trigger {
    margin: 0;
    padding: 0;
  }
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SubTitleDiv = styled.div`
  display: flex;
  margin: 0.85em 0;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  @media ${(props) => props.theme.mobile} {
  }
`;

const TableData = styled.div`
  font-size: 0.5em;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 200;
  margin-left: 1em;
  @media ${(props) => props.theme.mobile} {
    font-size: 0.7em;
  }
`;

const PopButton = styled(Button)`
  border-color: transparent;
  color: ${(props) =>
    props.visible === 'false'
      ? props.theme.colors.darkGray
      : props.theme.colors.primary};
  margin-right: 1em;
  padding: 0.15em 0.5em;
  height: 1.95em;
  :hover {
    border-color: transparent;
  }
`;

const TableDraw = styled.div`
  display: ${(props) => (props.visible === 'true' ? 'flex' : 'none')};
  flex-direction: column;
  @media ${(props) => props.theme.mobile} {
  }
`;

const TableSection = styled.section`
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.visible === 'false'
        ? props.theme.colors.lightGray
        : props.theme.colors.primary};
  border-radius: 1.2em;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  padding: 1em;
  margin-bottom: 1.5em;

  @media ${(props) => props.theme.mobile} {
    margin: 0 auto;
    padding: 0.5em;
  }
`;
const TableBody = styled(Table)`
  padding: 0 1.2em;

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
    /* position: sticky;
    top: 0px; */
    font-size: 0.85em;
    background: ${(props) => props.theme.colors.white};
    border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
    text-align: center;
  }

  .ant-table-cell {
    .ant-table-filter-column > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
    }
    .ant-table-column-sorters > span {
      justify-content: center;
      display: table;
      margin-left: auto;
    }
    .ant-table-column-sorters > span > span {
      width: 20px;
    }
    ::before {
      background-color: transparent !important;
    }
  }

  .ant-pagination.mini.ant-table-pagination.ant-table-pagination-center {
    @media ${(props) => props.theme.mobile} {
      margin: 1.5em 0;
    }
  }
  .ant-pagination-item-active {
    border: none;
    font-weight: bolder;
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
    color: #646464;
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
    padding: 0.9em;
  }

  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link,
  .ant-pagination-item {
    border: none;
  }

  .ant-table-pagination-right {
    justify-content: center;
  }

  .ant-table-pagination.ant-pagination {
    margin: 3em 0;
    align-items: center;
  }

  .ant-table-thead > tr > th:nth-child(2),
  .ant-table-tbody > tr > td:nth-child(2) {
    width: 8%;
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
    .ant-table-thead > tr > th:nth-child(1),
    .ant-table-tbody > tr > td:nth-child(1) {
      width: 5%;
    }
  }
`;

const TableFilter = styled(ReactTooltip)`
  box-shadow: 0 3px 6px 4px ${(props) => props.theme.colors.lightGray};
  opacity: 1 !important;
  left: 25em !important;
  border-radius: 25px !important;
  .ant-tabs-tab {
    font-size: 0.9em;
    font-weight: 400;
    padding: 0.3em 1.5em;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.primary};
  }
  .ant-tabs-nav-wrap {
    justify-content: center;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const SDrawer = styled(Drawer)`
  display: none;
  @media ${(props) => props.theme.mobile} {
    display: flex;
  }
`;

const TableTitleDiv = styled.div`
  font-weight: 700;
  @media ${(props) => props.theme.mobile} {
    text-align: center;
  }
`;

const LeftTitleDiv = styled.div`
  text-align: left;
  font-weight: 700;
  @media ${(props) => props.theme.mobile} {
    text-align: center;
  }
`;

const KeywordLink = styled.div`
  width: fit-content;
  font-size: 1.05em;
  margin-left: 0.3em;
`;

const CategoryLink = styled.div`
  width: fit-content;
  font-size: 0.9em;
  margin-left: 0.3em;
`;

const ProductAmount = styled.div`
  text-align: right;
  margin-right: 2.5em;
`;

const ExcelDiv = styled.div`
  margin-left: 1.5em;
`;
