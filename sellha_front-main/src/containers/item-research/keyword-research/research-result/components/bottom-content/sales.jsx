import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function index() {
  const keywordSearch = useSelector((state) => state.keywordSearch);

  return (
    <SalesDiv>
      <SalesItem>
        <SalesTitle>1등 상품 매출</SalesTitle>
        <div>
          {(keywordSearch.topSales &&
            `${keywordSearch.topSales.toLocaleString()}원`) ||
            '-'}
        </div>
      </SalesItem>
      <SalesItem>
        <SalesTitle>광고 경쟁 강도</SalesTitle>
        <div>
          {(keywordSearch.compIdx && `${keywordSearch.compIdx}`) || '-'}
        </div>
      </SalesItem>
    </SalesDiv>
  );
}

export default index;

const SalesDiv = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 1em;
  margin-left: 0.8em;
  width: 42%;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    grid-area: b;
    margin: 15px 0 0 0;
    padding: 2em 1em;
    box-shadow: 1px 2px 5px 2px ${(props) => props.theme.colors.lightGray};
  }
`;

const SalesItem = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
  }
`;

const SalesTitle = styled.div`
  border-bottom: 1px solid;
  font-weight: bold;
  margin-bottom: 1em;
`;
