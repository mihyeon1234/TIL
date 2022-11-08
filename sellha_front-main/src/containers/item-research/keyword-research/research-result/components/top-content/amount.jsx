import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

/**
 * 경쟁률 태그 텍스트 및 색상 값 셋팅
 * 작성자: 장다영
 * 업데이트: 2022.05.25
 * @param {String} compete
 * @returns
 */
function CompeteTag({ compete }) {
  const competeF = parseFloat(compete?.toString().replace(/,/g, ''));

  let colorValue = '';
  let text = '';

  if (!competeF || competeF < 0) {
    return <SubTag>-</SubTag>;
  }

  if (competeF >= 70.8) {
    colorValue = '#ec6a6a';
    text = '매우 나쁨';
  } else if (competeF < 70.8 && competeF >= 10.4) {
    colorValue = '#955BA5';
    text = '나쁨';
  } else if (competeF < 10.4 && competeF >= 0.5) {
    colorValue = '#4EBA6F';
    text = '보통';
  } else if (competeF < 0.5 && competeF >= 0.05) {
    colorValue = '#34adde';
    text = '좋음';
  } else {
    colorValue = '#F0C419';
    text = '매우 좋음';
  }

  return <SubTag style={{ color: colorValue }}>{text}</SubTag>;
}

/**
 * 검색량 태그 텍스트 및 색상 값  셋팅
 * 작성자: 장다영
 * 업데이트: 2022.05.25
 * @returns
 */
function SearchTag({ search }) {
  let text = '';
  let colorValue = '';

  if (!search) {
    return <SubTag />;
  }

  if (search >= 20000) {
    text = '대형';
    colorValue = '#ec6a6a';
  } else if (search < 20000 && search >= 5000) {
    text = '중형';
    colorValue = '#4EBA6F';
  } else {
    text = '소형';
    colorValue = '#FFDA4F';
  }

  return <SubTag style={{ color: colorValue }}>{text}</SubTag>;
}

function index() {
  const keywordSearch = useSelector((state) => state.keywordSearch);

  return (
    <AmountDiv>
      <AmountItem>
        <AmountTitle>경쟁률</AmountTitle>
        <AmountContent>
          {keywordSearch.compete >= 0 && keywordSearch.compete}
          <CompeteTag compete={keywordSearch.compete} />
        </AmountContent>
      </AmountItem>
      <AmountItem>
        <AmountTitle>검색량</AmountTitle>
        <AmountContent>
          {keywordSearch.searchAmount
            ? keywordSearch.searchAmount.toLocaleString()
            : '20 이하'}
          <SearchTag search={keywordSearch.searchAmount} />
        </AmountContent>
      </AmountItem>
      <AmountItem>
        <AmountTitle>상품수</AmountTitle>
        <AmountContent>
          {(keywordSearch.productAmount &&
            `${keywordSearch.productAmount.toLocaleString()}개`) ||
            '0'}
        </AmountContent>
      </AmountItem>
    </AmountDiv>
  );
}

export default index;

const AmountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  box-shadow: 1px 2px 5px 2px ${(props) => props.theme.colors.lightGray};
  border-radius: 1em;
  margin-left: 0.8em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0;
    padding: 1.2em;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 16px;
    border: 1px solid #eee;
  }
`;

const AmountItem = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
  }
`;

const AmountTitle = styled.div`
  font-size: 1em;
  font-weight: bold;
  cursor: default;
  background: linear-gradient(to top, rgb(255, 222, 135) 25%, transparent 30%);
  margin-bottom: 1em;
  @media ${(props) => props.theme.mobile} {
    margin-bottom: 5px;
  }
`;

const AmountContent = styled.div`
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  height: 3em;
  @media ${(props) => props.theme.mobile} {
    font-size: 1em;
  }
`;

const SubTag = styled.div`
  font-size: 0.8em;
  text-align: center;
`;
