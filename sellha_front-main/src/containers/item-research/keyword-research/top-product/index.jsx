import React from 'react';
import styled from 'styled-components';
import ResultTable from './components/Table';

export default function TopProduct() {
  return (
    <ProductDiv>
      <TitleDiv>
        <ProductTitle>Top 80 상품 리스트</ProductTitle>
        <DateDiv>실시간 업데이트</DateDiv>
      </TitleDiv>
      <ProductContent>
        <ResultTable />
      </ProductContent>
      <PageUpButton
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      >
        ↑
      </PageUpButton>
    </ProductDiv>
  );
}

const DateDiv = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 500;
  margin-left: 1rem;
`;
const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;

  .ant-table-header > table {
    height: 72px;
  }

  .ant-table-wrapper {
    padding: 0 1em;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProductTitle = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  margin: 0.5em 0;
  @media ${(props) => props.theme.mobile} {
    font-size: 16px;
    margin: 8px;
  }
`;

const ProductContent = styled.div`
  & thead > tr:nth-child(1) > th {
    font-size: 0.75rem;
    background: ${(props) => props.theme.colors.white};
    border-bottom: 2px solid ${(props) => props.theme.colors.black};
    text-align: center;
  }

  .product-row {
    cursor: pointer;
  }

  .ant-table-cell {
    .ant-table-filter-column > div {
      display: flex;
      flex-direction: row;
      width: 95%;
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
  .ant-pagination-item-active {
    border: none;
    font-weight: bolder;
  }
  .ant-table-filter-trigger-container {
    background: #fff;
  }
  .ant-pagination-options-size-changer.ant-select {
    display: none;
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
    padding: 0.6em 1em;
  }
  table > tbody.ant-table-tbody > tr > td:nth-child(11) > div {
    margin: 0 auto;
  }
  .ant-table-row.ant-table-row-level-1.product-row {
    background-color: ${(props) => props.theme.colors.lightGray};
  }

  @media ${(props) => props.theme.mobile} {
    .ant-table-filter-column > div {
      width: 100%;
    }

    .ant-table-cell {
      /* margin: 0; */
      /* padding: 0; */
    }
    table > tbody.ant-table-tbody {
      font-size: 12px;
    }

    table > tbody.ant-table-tbody > tr > td {
      font-size: 12px;
      padding: 0.5em 0.7rem;
    }

    .ant-table-column-sorters > span > span {
      width: 10px;
    }
  }
`;

const PageUpButton = styled.span`
  user-select: none;
  cursor: pointer;
  opacity: 1;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.white};
  bottom: 26px;
  right: 26px;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  font-size: 20px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
  z-index: 101;
  &:hover {
    background: ${(props) => props.theme.colors.primary};
  }
`;
