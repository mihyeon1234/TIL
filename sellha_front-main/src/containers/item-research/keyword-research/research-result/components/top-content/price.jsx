import React from 'react';
import { useSelector } from 'react-redux';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import styled from 'styled-components';

function index() {
  const keywordSearch = useSelector((state) => state.keywordSearch);

  return (
    <PriceDiv>
      <PriceItem>
        <PriceTitle>평균가</PriceTitle>
        <PriceContent>
          {Math.round(keywordSearch.avgPrice).toLocaleString()}원
        </PriceContent>
      </PriceItem>
      <PriceSubItem>
        <PriceContainer>
          <PriceSubTitle>
            최고가
            <MaximumPrice />
          </PriceSubTitle>
          <PriceSubContent>
            {keywordSearch?.highPrice < 0
              ? '-'
              : keywordSearch.highPrice.toLocaleString()}
          </PriceSubContent>
        </PriceContainer>
        <PriceContainer>
          <PriceSubTitle>
            최저가
            <LowestPrice />
          </PriceSubTitle>
          <PriceSubContent>
            {keywordSearch?.lowPrice < 0
              ? '-'
              : keywordSearch.lowPrice.toLocaleString()}
          </PriceSubContent>
        </PriceContainer>
      </PriceSubItem>
    </PriceDiv>
  );
}

export default index;

const PriceDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  box-shadow: 1px 2px 5px 2px ${(props) => props.theme.colors.lightGray};
  border-radius: 1em;
  margin-left: 0.8em;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0;
    margin-top: 16px;
    padding: 1.2em 0;
    border: 1px solid #eee;
    justify-content: center;
  }
`;

const PriceItem = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0;
  }
`;

const PriceSubItem = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
  }
`;

const PriceContainer = styled.div`
  @media ${(props) => props.theme.mobile} {
    margin-left: 1.5em;
    text-align: center;
  }
`;

const PriceTitle = styled.div`
  font-size: 1em;
  font-weight: bold;
  cursor: default;
  background: linear-gradient(to top, rgb(255, 222, 135) 25%, transparent 30%);
  width: fit-content;
  margin-bottom: 1.5em;
  @media ${(props) => props.theme.mobile} {
    margin-bottom: 5px;
  }
`;

const PriceSubTitle = styled.div`
  font-size: 0.85em;
  font-weight: bold;
  cursor: default;
  text-align: center;
  margin-top: 0.5em;
  border-bottom: 1px solid;
  @media ${(props) => props.theme.mobile} {
  }
`;

const PriceContent = styled.div`
  font-size: 1em;
  font-weight: bold;
`;

const PriceSubContent = styled.div`
  font-size: 0.8em;
  margin-bottom: 0.5em;
`;

const MaximumPrice = styled(GoArrowUp)`
  color: #e36d6d;
`;

const LowestPrice = styled(GoArrowDown)`
  color: #1679f2;
`;
