import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import 'chartjs-plugin-datalabels';

import Representiative from './components/top-content/representative';
import Attract from './components/top-content/attract';
import Amount from './components/top-content/amount';
import Price from './components/top-content/price';
import GraphChart from './components/graph-chart';
import AgeChart from './components/bar-chart/age-chart';
import GenderChart from './components/bar-chart/gender-chart';
import DeviceChart from './components/bar-chart/device-chart';
import GrowthSeason from './components/bottom-content/growth-season';
import Sales from './components/bottom-content/sales';
import BrandShare from './components/bottom-content/brand-share';
import RelatedKeyword from './components/related-keyword';

function ResearchResult({ param }) {
  const keywordSearch = useSelector((state) => state.keywordSearch);

  return (
    <DataDiv>
      <ColDiv>
        <Representiative />
        <FirstInfoDiv>
          <Attract />
          <Amount />
          <Price />
        </FirstInfoDiv>
      </ColDiv>
      <ColDiv>
        <SecondInfoDiv>
          <GraphDiv>
            <SearchGraphDiv>
              <TitleDiv>
                <SearchGraphTitle>검색량 추이</SearchGraphTitle>
              </TitleDiv>
              {(!keywordSearch.searchAmount && (
                <NoData>데이터 없음</NoData>
              )) || (
                <SearchGraphContent>
                  <GraphChart
                    graph={keywordSearch.graph}
                    searchAmount={keywordSearch.searchAmount}
                  />
                </SearchGraphContent>
              )}
            </SearchGraphDiv>
            <SubDetailsDiv>
              <SubTitle>연령별</SubTitle>
              <AgeChart data={keywordSearch} />
              <SubTitle>성별</SubTitle>
              <GenderChart data={keywordSearch} />
              <SubTitle>기기별</SubTitle>
              <DeviceChart data={keywordSearch} />
            </SubDetailsDiv>
          </GraphDiv>
          <DetailDataDiv>
            <GrowthSeason />
            <Sales />
            <BrandShare />
          </DetailDataDiv>
        </SecondInfoDiv>
        <RelatedKeyword param={param} />
      </ColDiv>
    </DataDiv>
  );
}

export default ResearchResult;

const DataDiv = styled.div`
  height: fit-content;
  margin-top: 2em;
  width: 100%;
  .tooltipResult {
    border-radius: 1.25em;
    font-size: 0.9em;
    padding: 0.6em 1em;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0;
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
  }
`;

const ColDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 2em 0;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    margin: 0;
  }
`;

const FirstInfoDiv = styled.div`
  display: flex;
  width: 60%;
  height: 9em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    flex-direction: column;
  }
`;

const NoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  color: ${(props) => props.theme.colors.gray};
  height: 20em;
`;

const SecondInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    flex-direction: column;
    margin-top: 183px;
  }
`;

const GraphDiv = styled.div`
  display: flex;
  height: 31.5em;
  @media ${(props) => props.theme.mobile} {
    height: 100%;
    margin-top: 1.35em;
  }
`;

const DetailDataDiv = styled.div`
  display: flex;
  margin-top: 1em;
  @media ${(props) => props.theme.mobile} {
    display: grid;
    grid-template-areas:
      'a a c'
      'b b b';
    margin-top: 18px;
  }
`;

const SearchGraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 1em;
  box-shadow: 1px 2px 5px 2px ${(props) => props.theme.colors.lightGray};
  width: 70%;
  padding: 1.25em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 3em;
  @media ${(props) => props.theme.mobile} {
    margin-bottom: 15px;
  }
`;

const SearchGraphTitle = styled.span`
  border-bottom: 1px solid ${(props) => props.theme.colors.darkGray};
  font-weight: 600;
  width: fit-content;
`;

const SearchGraphContent = styled.div`
  width: 100%;
  height: auto;
`;

const SubDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 1em;
  margin-left: 0.8em;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const SubTitle = styled.div`
  border-bottom: 1px solid;
  font-weight: bold;
  margin-bottom: 1em;
  width: fit-content;
  margin-top: 1em;
`;
