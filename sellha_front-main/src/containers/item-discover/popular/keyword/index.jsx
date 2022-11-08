import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Table } from 'antd';

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';
import StarRatings from 'react-star-ratings';
import { fetchChartData, getTotal } from 'http-api';
import KeywordSaveBtn from 'components/KeywordSaveBtn';
import replaceParam from 'components/keyword';
import ProgressBar, { IndicatorIcon, TipBox } from 'components/ProgressBar';
import Excel from './component/Excel';
import { failData, fetchData, setData, unsetData } from './reducer';
import {
  getCompeteTagText,
  getSearchAmountTagText,
  getMallRatioTagText,
} from '../component';
import { StateTag, TagDiv, DetailData } from '../style';

/**
 * 경쟁률 데이터 가공
 * 작성자: 장다영
 * 업데이트: 2022.05.18
 * 업데이트 내용: string을 float로 자료형 맞춤
 * 숫자 4자리 이상일 때 ',' 들어가서 math.round 오류 생기는 부분 수정
 * @param {String} compete
 * @returns {String} 경쟁률
 */
function convertCompete(compete) {
  const competeF = parseFloat(compete.toString().replace(',', ''));
  if (competeF < 100) {
    return ` ${competeF}`;
  }
  return ` ${Math.round(competeF).toLocaleString()}`;
}

export default function ChartPage() {
  const dispatch = useDispatch();

  const { selectReal } = useSelector((state) => state.discover);
  const { loading, pagination, data, lastUpdated, filtering, progress } =
    useSelector((state) => state.keywordChart);

  const [VisibleDraw, setVisibleDraw] = useState(true);
  const [tip, setTip] = useState('');

  useEffect(() => {
    const element = document.getElementById('notice');
    element.scrollIntoView({
      alignToTop: 'true',
      behavior: 'smooth',
    });
  }, [pagination.current]);

  useEffect(() => {
    setVisibleDraw(true);
    if (!selectReal.id) {
      return;
    }

    fetchChart({
      filters: filtering,
    });
  }, [selectReal.id]);

  useEffect(() => {
    if (progress >= 0 && progress < 0.3) setTip('아이템을 찾는 중');
    else if (progress >= 0.3 && progress < 0.45) setTip('아이템을 가져오는 중');
    else if (progress >= 0.45 && progress < 0.6) setTip('아이템을 씻는 중');
    else if (progress >= 0.6 && progress < 0.75)
      setTip('아이템을 깨끗하게 닦는 중');
    else if (progress >= 0.75 && progress < 0.9) setTip('아이템을 감상하는 중');
    else if (progress >= 0.9) setTip('아이템을 포장하는 중');
    else setTip('');
  }, [progress]);

  /**
   * 인기차트 키워드 차트 총 데이터수, 차트 데이터 불러오기
   * 업데이트: 2021.12.09 _ 테이블 정렬 오류 있어서 데이터 수정
   * 작성자: 장다영
   * @param {JSON} params
   */
  const fetchChart = async (params) => {
    dispatch(unsetData());
    try {
      dispatch(fetchData());
      // 페이지 데이터
      let pageValue = {
        current: 1,
        pageSize: 40,
        size: 'small',
        position: ['bottomCenter'],
        pageSizeOptions: [20, 40, 60, 80],
        locale: { items_per_page: '개씩 보기' },
      };
      // 페이지값 있을 때
      if (params.pagination) {
        pageValue = {};
        pageValue = params.pagination;
      }

      // 카테고리 데이터
      let categoryValue = null;
      if (selectReal) {
        categoryValue = {
          id: selectReal.id,
          level: selectReal.level,
          hasChild: selectReal.hasChild,
        };
      }

      // 데이터 총 갯수 가져오기
      const total = await getTotal({
        category: categoryValue,
        pagination: pageValue,
        filters: params.filters,
        keyword: params.keyword,
      });

      // 로딩화면에 데이터 총 갯수 셋팅
      pageValue.total = total;

      // 정렬 기본 값
      let sorterValue = {
        order: undefined,
        field: 'attract',
      };

      // 정렬 값 있으면 셋팅
      if (params.sorter) {
        sorterValue = {
          order: params.sorter.order,
          field: params.sorter.field,
        };
      }

      // 차트 데이터 불러오기
      const result = await fetchChartData({
        category: categoryValue,
        pagination: pageValue,
        filters: params.filters,
        keyword: params.keyword,
        sorter: sorterValue,
      });

      dispatch(
        setData({
          data: result.chart,
          pagination: pageValue,
          lastUpdated: result.lastUpdated,
        }),
      );
    } catch (error) {
      dispatch(failData());
    }
  };

  const handleTableChange = (page, filters, sorter) => {
    const selectValue = filters;
    if (selectValue.keyword && selectValue.keyword.indexOf('brandShop') > -1) {
      selectValue.keyword = ['brand', 'shopping'];
    }

    fetchChart({
      sorter,
      pagination: page,
      filters: { ...selectValue, ...filtering },
    });
  };

  const decodeKeyword = (keyword) => {
    try {
      const result = decodeURIComponent(keyword);
      return result;
    } catch (error) {
      return keyword;
    }
  };

  useEffect(() => {
    const element = document.getElementById('notice');
    element.scrollIntoView({
      alignToTop: 'true',
      behavior: 'smooth',
    });
  }, [pagination.current]);

  const columns = [
    {
      title: <STitle>저장</STitle>,
      width: '5%',
      align: 'center',
      fixed: 'left',
      responsive: ['lg'],
      render: (row) => <KeywordSaveBtn item={row} />,
    },
    {
      title: <STitle>키워드</STitle>,
      dataIndex: 'keyword',
      fixed: 'left',
      filterMultiple: false,
      filters: [
        {
          text: '일반 키워드',
          value: 'general',
        },
        {
          text: '브랜드 키워드',
          value: 'brand',
        },
        {
          text: '쇼핑성 키워드',
          value: 'shopping',
        },
        {
          text: '브랜드+쇼핑성',
          value: 'brandShop',
        },
      ],
      render: (text, row) => {
        if (!text) {
          return '-';
        }

        return (
          <KeywordBox>
            <KeywordLink
              data-tip
              data-for="tooltip-Keyword"
              onClick={() => {
                window.open(`/keyword?keyword=${replaceParam(text)}&tab=1`);
              }}
            >
              <KeywordText>{decodeKeyword(text)}</KeywordText>
            </KeywordLink>
            <ReactTooltip
              id="tooltip-Keyword"
              place="right"
              effect="solid"
              className="tooltipConn"
              delayShow={200}
            >
              <span>더 자세한 분석보기</span>
            </ReactTooltip>
            {row.isShopping && <Icon color="s">S</Icon>}
            {row.isBrand && <Icon color="b">B</Icon>}
          </KeywordBox>
        );
      },
    },
    {
      title: <STitle>매력도</STitle>,
      dataIndex: 'attract',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (value) => (
        <StarDiv>
          <StarRatings
            rating={value / 1}
            starRatedColor="#ffcc44"
            numberOfStars={5}
            name="rating"
            starDimension="14px"
            starSpacing="-5px"
          />
          &nbsp;
          <StarScore>
            {!value && '0'}
            {value && (value / 1).toFixed(1)}
          </StarScore>
        </StarDiv>
      ),
    },
    {
      title: <STitle>카테고리</STitle>,
      dataIndex: 'categoryName',
      align: 'center',
      render: (text, row) => {
        if (!text) {
          return '-';
        }
        return (
          <Compete data-tip data-for={String(row.rank)}>
            {text}
            <ReactTooltip id={String(row.rank)} place="right">
              <span>{row.fullPath}</span>
            </ReactTooltip>
          </Compete>
        );
      },
    },
    {
      /**
       * 경쟁률 보여주는 부분
       * 작성자: 장다영
       * 업데이트: 2022.06.17
       * 업데이트 내용: 디자인 수정 및 태그 내용 가지고 오는 코드 분리
       */
      title: <STitle>경쟁률</STitle>,
      dataIndex: 'compete',
      align: 'center',
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
      sorter: true,
      render: (text) => {
        if (text < 0) {
          return '-';
        }

        const competeText = getCompeteTagText(text);
        return (
          <TagDiv>
            <StateTag data-type={competeText.type}>{competeText.text}</StateTag>
            <DetailData>{convertCompete(text)}</DetailData>
          </TagDiv>
        );
      },
    },
    {
      /**
       * 검색량 보여주는 부분
       * 작성자: 장다영
       * 업데이트: 2022.06.17
       * 업데이트 내용: 디자인 수정 및 태그 내용 가지고 오는 코드 분리
       */
      title: <STitle>검색량</STitle>,
      dataIndex: 'searchAmount',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (text, row) => {
        if (text < 0) {
          return '-';
        }

        const tagText = getSearchAmountTagText(row.searchAmount);
        return (
          <TagDiv>
            <StateTag data-type="default">{tagText}</StateTag>
            <NumText>{parseInt(text, 10).toLocaleString()}</NumText>
          </TagDiv>
        );
      },
    },
    {
      title: <STitle>상품수</STitle>,
      dataIndex: 'productAmount',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (text) => {
        if (!text) {
          return <ProductAmount>-</ProductAmount>;
        }

        return (
          <ProductAmount>{parseInt(text, 10).toLocaleString()}</ProductAmount>
        );
      },
    },
    {
      /**
       * 묶음상품 보여주는 부분
       * 작성자: 장다영
       * 업데이트: 2022.06.17
       * 업데이트 내용: 디자인 수정 및 태그 내용 가지고 오는 코드 분리
       */
      title: (
        <STitle>
          묶음상품
          <br /> 비율
        </STitle>
      ),
      dataIndex: 'mallRatio',
      sorter: true,
      align: 'center',
      sortDirections: ['descend', 'ascend'],
      render: (text) => {
        if (text.length === 0 || text.lowMall40 === null) {
          return '-';
        }

        const ratioTagText = getMallRatioTagText(text.lowMall40);
        return (
          <TagDiv>
            <StateTag data-type={ratioTagText.type}>
              {ratioTagText.text}
            </StateTag>
            <DetailData>
              {parseInt(text.lowMall40, 10).toLocaleString()}
            </DetailData>
          </TagDiv>
        );
      },
    },

    {
      title: <STitle>광고 경쟁 강도</STitle>,
      dataIndex: 'compIdx',
      width: '10%',
      align: 'center',
      render: (text, row) => {
        if (!text) {
          return '-';
        }
        return `${row.compIdx}`;
      },
    },
    {
      title: <STitle>평균가</STitle>,
      dataIndex: 'avgPrice',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (text) => {
        if (!text) {
          return '-';
        }

        return `${text.toLocaleString()}원`;
      },
    },
    {
      title: <STitle>성장성</STitle>,
      dataIndex: 'potential',
      align: 'center',
      render: (text) => {
        let value = '유지';
        if (!text) {
          value = '-';
        } else if (text < -0.01) {
          value = '하락';
        } else if (text > 0.01) {
          value = '상승';
        }

        return value;
      },
    },
    {
      title: <STitle>계절성</STitle>,
      dataIndex: 'seasonal',
      align: 'center',
      render: (text) => {
        if (!text) {
          return '-';
        }

        return `${text.join(',')}월`;
      },
    },
    {
      title: <STitle>브랜드 점유율</STitle>,
      dataIndex: 'brandShare',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (text) => {
        if (!text) {
          return '-';
        }

        return `${parseInt(text * 100, 10)}%`;
      },
    },
  ];

  return (
    <Container>
      <TableSection visible={VisibleDraw.toString()}>
        <TableHeader onClick={() => setVisibleDraw((prev) => !prev)}>
          <TableTitle>
            <TitleDiv visible={VisibleDraw.toString()}>키워드 차트</TitleDiv>
            {lastUpdated && (
              <TableData> {lastUpdated} 데이터 업데이트</TableData>
            )}
          </TableTitle>
          <PopButton visible={VisibleDraw.toString()}>
            {VisibleDraw && <UpOutlined />}
            {!VisibleDraw && <DownOutlined />}
          </PopButton>
        </TableHeader>
        <TableDraw visible={VisibleDraw.toString()}>
          <TableExtra visible={VisibleDraw.toString()}>
            <OptionContainer>
              <DisableContainer data-tip data-for="keyword-filter">
                <Filter disabled>필터</Filter>
                <ReactTooltip
                  id="keyword-filter"
                  className="tooltip-keyword"
                  place="left"
                  effect="solid"
                  backgroundColor="#0000009d"
                  textColor="#ffffff"
                >
                  🐝 서비스 준비 중입니다
                </ReactTooltip>
              </DisableContainer>
              <Excel />
            </OptionContainer>
            <BrandShopping>
              <IconDiv>
                <Icon color="s">S</Icon>
                <InfoName>쇼핑 키워드</InfoName>
              </IconDiv>
              <IconDiv>
                <Icon color="b">B</Icon>
                <InfoName>브랜드</InfoName>
              </IconDiv>
            </BrandShopping>
          </TableExtra>
          <ProgressBar isAnimating={loading} setTip={setTip} />
          <TableBody
            key={selectReal.id}
            columns={columns}
            // eslint-disable-next-line no-underscore-dangle
            rowKey={(record) => record._id}
            dataSource={data}
            pagination={pagination}
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
            onChange={handleTableChange}
            showSorterTooltip={false}
            visible={VisibleDraw.toString()}
            scroll={{ x: 1400 }}
            sticky
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

  @media ${(props) => props.theme.mobile} {
    margin: 1.2em 0;
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
    padding: 0.5em;
    margin: 0 auto;
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const TableTitle = styled.div`
  display: flex;
  margin: 0.85em 0;
  justify-content: space-between;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
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
const TableData = styled.div`
  font-size: 0.5em;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 200;
  margin-left: 1em;
`;

const TableExtra = styled.div`
  display: ${(props) => (props.visible === 'true' ? 'flex' : 'none')};
  margin: 0.5em 2em 0.5em 1em;
  justify-content: space-between;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding: 0 2.2em;
    justify-content: flex-end;
  }
`;

const OptionContainer = styled.div`
  display: flex;
`;

const DisableContainer = styled.div``;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.4em;
  height: 1.4em;
  font-size: 0.85em;
  font-weight: 600;
  color: ${(props) =>
    props.color === 'b' ? props.theme.colors.primary : 'black'};
  background-color: ${(props) =>
    props.color === 'b' ? 'black' : props.theme.colors.primary};
  border-radius: 0.2em;
  cursor: default;
  margin: 0 0.35em;
`;

const BrandShopping = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 11px;
  font-weight: 500;

  @media ${(props) => props.theme.mobile} {
    font-size: 0.8em;
  }
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5em;
`;

const InfoName = styled.span``;

const Filter = styled(Button)`
  width: fit-content;
  height: 3em;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.blue};
  border-radius: 1em;
  font-size: 0.9em;
  margin-right: 0.9em;

  &:hover,
  &:focus,
  &:active {
    font-weight: 600;
    border: 1px solid ${(props) => props.theme.colors.blue};
    color: ${(props) => props.theme.colors.blue};
    box-shadow: none;
  }

  @media ${(props) => props.theme.mobile} {
    display: none;
    margin: 0;
    width: 70px;
    height: 35px;
    padding: 5px;
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
    position: sticky;
    top: 0px;
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

  .ant-table-thead > tr > th:nth-child(2).ant-dropdown-trigger,
  .ant-table-filter-trigger {
    width: 30px;
    padding-left: 15px;
  }

  .ant-table-filter-trigger {
    right: 1.5em;
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
      width: 10%;
    }
  }
`;

const TableDraw = styled.div`
  display: ${(props) => (props.visible === 'true' ? 'flex' : 'none')};
  flex-direction: column;
  @media ${(props) => props.theme.mobile} {
  }
`;
const STitle = styled.div`
  font-weight: 600;
  @media ${(props) => props.theme.mobile} {
    font-size: 0.9em;
  }
`;
const KeywordBox = styled.div`
  display: flex;
  align-items: center;

  .tooltipConn {
    font-size: 11px;
    padding: 5px 10px;
    margin-left: 10px !important;
    border-radius: 15px;
  }

  @media ${(props) => props.theme.mobile} {
  }
`;

const KeywordLink = styled.div`
  width: 100%;
  font-size: 0.95em;
  margin-right: 0.3em;
  :hover {
    color: ${(props) => props.theme.colors.black};
    cursor: pointer;
  }
`;

const KeywordText = styled.span`
  :hover {
    background: linear-gradient(
      to top,
      rgb(255, 222, 135) 35%,
      transparent 35%
    );
  }
`;

const StarDiv = styled.div`
  display: flex;

  .star-ratings {
    display: flex !important;
    flex-direction: row;
    align-items: center;
  }
  .star-container {
    display: flex !important;
  }
  @media ${(props) => props.theme.mobile} {
    margin-left: 10%;
  }
`;

const StarScore = styled.div`
  display: inline-block;
  height: 20px;
  line-height: 22px;
  font-size: 13px;
`;

const Compete = styled.div`
  text-align: left;
  margin-left: 1.8em;
`;

const NumText = styled.div`
  color: gray;
  font-size: 0.8em;
`;
const ProductAmount = styled.div`
  text-align: right;
  margin-right: 2em;
`;
