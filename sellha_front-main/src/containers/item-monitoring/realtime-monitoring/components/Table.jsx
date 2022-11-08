import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Table } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';

import {
  // fetchData,
  // setData,
  setInputKeyword,
  setInputStore,
  setPagination,
  setRowKeys,
} from '../reducer';

const TableComponent = () => {
  const dispatch = useDispatch();
  const { loading, pagination, data, rowKeys } = useSelector(
    (state) => state.realtimeMonitoring,
  );

  const setInitPage = () => {
    const element = document.getElementById('result');
    element.scrollIntoView({
      alignToTop: 'true',
    });

    dispatch(setPagination(1));
  };

  const clickButton = () => {
    setTimeout(() => {
      document.getElementById('real-submit').click();
    }, 1000);
  };

  const onClickReload = ({ store, keyword }) => {
    dispatch(setInputStore(store));
    dispatch(setInputKeyword(keyword));

    Swal.fire({
      html: `스토어 '${store}'의 키워드 '${keyword}' <br/> 재조회를 하시겠습니까?`,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      showCancelButton: true,
      confirmButtonColor: '#FFC83A',
      cancelButtonColor: '#D9D9D9',
      allowEnterKey: false,
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    }).then((res) => {
      if (res.isConfirmed) {
        setInitPage();
        clickButton();
      }
    });
  };

  const columns = [
    {
      title: '스토어',
      dataIndex: 'store',
      width: '8%',
      align: 'center',
      render: (text = '-') => text,
    },
    {
      title: '키워드',
      dataIndex: 'keyword',
      width: '10%',
      align: 'center',
      render: (text = '-') => text,
    },
    {
      title: '상품',
      dataIndex: 'productTitle',
      width: '45%',
      filters: [
        {
          text: '일반상품',
          value: 'normal',
        },
        {
          text: '묶음상품',
          value: 'lowMall',
        },
        {
          text: '광고상품',
          value: 'ad',
        },
        {
          text: '윈도상품',
          value: 'wd',
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      render: (text, row) => {
        if (!text) {
          return '-';
        }
        return (
          <RowDiv>
            <img
              data-tip
              data-for={row.imageUrl}
              src={row.imageUrl}
              alt="이미지"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '5px',
                marginRight: '10px',
              }}
            />
            <ColDiv>
              <div>
                {row.type === 'ad' && (
                  <AdTag data-tip data-for="tooltip-ad">
                    광고
                  </AdTag>
                )}
                {row.type === 'wd' && <WdTag>{row.wdNm}</WdTag>}
                <ProductText
                  onClick={() => {
                    if (row.mallProductUrl) {
                      window.open(row.mallProductUrl);
                    }
                  }}
                >
                  {row.productTitle}
                </ProductText>
                {new Date() - new Date(row.crawledDate) < 300000 && (
                  <NewText>NEW</NewText>
                )}
              </div>
              <ReactTooltip
                id="tooltip-ad"
                className="tooltip-ad"
                place="top"
                effect="solid"
              >
                광고 영역의 상품 순위 입니다.
              </ReactTooltip>

              <RowDiv>
                <SubTitle>리뷰 </SubTitle>
                <SubNum>{row.reviewCount.toLocaleString()}</SubNum>
                <SubTitle>구매건수 </SubTitle>
                {row.purchaseCount > 0 && (
                  <SubNum>{row.purchaseCount.toLocaleString()}</SubNum>
                )}
                {!row.purchaseCount && <SubNum>-</SubNum>}
                <SubTitle>등록일</SubTitle>
                <SubNum>{row.openDate}</SubNum>
              </RowDiv>
            </ColDiv>
          </RowDiv>
        );
      },
    },
    {
      title: <ColDiv>전체 순위</ColDiv>,
      dataIndex: 'rank',
      width: '10%',
      align: 'center',
      render: (text, row) => {
        if (!text) {
          return '-';
        }
        return (
          <ColDiv>
            <RankDiv>
              <RankingText>{row.rank.toLocaleString()}</RankingText>위
            </RankDiv>
            {row.setRank && (
              <SetRankingText>묶음상품 {row.setRank}위</SetRankingText>
            )}
          </ColDiv>
        );
      },
    },
    {
      title: <ColDiv>페이지 순위</ColDiv>,
      dataIndex: 'pageRank',
      width: '12%',
      align: 'center',
      render: (text, row) => {
        if (!text) {
          return '-';
        }
        return (
          <RankDiv>
            <RankingText>
              {row.pageIndex} 페이지 {row.pageRank}위
            </RankingText>
          </RankDiv>
        );
      },
    },
    {
      title: '조회일',
      dataIndex: 'crawledDate',
      width: '10%',
      align: 'center',
      render: (text, row) => {
        if (!text) {
          return '-';
        }
        return `${row.crawledDate}`;
      },
    },
    {
      title: '재조회',
      width: '6%',
      align: 'center',
      render: (text, row) => {
        if (!text) {
          return '-';
        }
        return (
          <ReloadButton
            loading={loading.toString()}
            onClick={() => !loading && onClickReload(row)}
          >
            <ReloadIcon rotate={-90} />
          </ReloadButton>
        );
      },
    },
  ];

  return (
    <TableBody
      rowKey={(list) => list.id}
      columns={columns}
      dataSource={data}
      rowSelection={{
        onChange: (selectedRowKeys) => {
          dispatch(setRowKeys(selectedRowKeys));
        },
        selectedRowKeys: rowKeys,
      }}
      showSorterTooltip={false}
      showSizeChanger
      sticky="true"
      pagination={{
        ...pagination,
        locale: { items_per_page: '개씩 보기' },
        size: 'small',
        position: ['bottomCenter'],
      }}
      onChange={({ current }) => {
        dispatch(setPagination(current));
        const element = document.getElementById('result');
        element.scrollIntoView({
          alignToTop: 'true',
          behavior: 'smooth',
        });
      }}
      locale={{
        emptyText: loading ? (
          <span>
            <LoadingOutlined style={{ marginRight: '8px' }} />
            로딩 중
          </span>
        ) : (
          '스토어명과 키워드를 입력하고 조회하기 버튼을 클릭하세요.'
        ),
        filterConfirm: '적용',
        filterReset: '초기화',
        filterEmptyText: '결과가 없습니다.',
      }}
    />
  );
};

export default TableComponent;

const TableBody = styled(Table)`
  & thead > tr:nth-child(1) > th {
    font-size: 0.85em;
    background: ${(props) => props.theme.colors.white};
    border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
    text-align: center;
    padding: 8px 6px;
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
    font-size: 0.85rem;
  }

  table > tbody.ant-table-tbody > tr > td {
    font-size: 0.95em;
    padding: 0.9em 0.5em;
    height: 55px;
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
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto 0;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductText = styled.span`
  width: fit-content;

  &:hover {
    cursor: pointer;
    background: linear-gradient(to top, #ffd94f84 38%, transparent 35%);
  }
`;

const SubTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const SubNum = styled.div`
  font-size: 0.75rem;
  margin: 0 5px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const NewText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.orange};
  margin-left: 5px;
`;

const RankDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ReloadButton = styled.div`
  background-color: ${({ theme, loading }) =>
    loading === 'true' ? theme.colors.lineGray : theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  padding: 3px 0;
  cursor: ${({ loading }) => (loading === 'true' ? 'not-allowed' : 'pointer')};

  > span {
    color: ${({ theme, loading }) =>
      loading === 'true' && theme.colors.darkGray};
  }

  :hover {
    background-color: ${({ theme, loading }) =>
      loading === 'false' && theme.colors.white};
    border: 1px solid
      ${({ theme, loading }) =>
        loading === 'false' ? theme.colors.orange : theme.colors.lightGray};
    > span {
      color: ${({ theme, loading }) =>
        loading === 'false' && theme.colors.orange};
    }
  }
`;

const ReloadIcon = styled(ReloadOutlined)`
  font-size: 12px;
`;

const TagStyle = styled.span`
  width: fit-content;
  border-radius: 0.5em;
  font-size: 0.55em;
  margin-right: 5px;
  padding: 2px 5px;
`;

const AdTag = styled(TagStyle)`
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
`;

const WdTag = styled(TagStyle)`
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
`;

const RankingText = styled.span`
  font-size: 0.8rem;
`;

const SetRankingText = styled.span`
  font-size: 0.7rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.darkGray};
`;
