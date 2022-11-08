import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function showPotential(potential) {
  if (!potential) {
    return '없음';
  }

  if (potential > 0.001) {
    return '상승';
  }

  if (potential < -0.001) {
    return '하강';
  }

  return '유지';
}

function showSeasonal(seasonal) {
  if (!seasonal) {
    return '없음';
  }

  return `${seasonal.join(',')}월`;
}

function index() {
  const keywordSearch = useSelector((state) => state.keywordSearch);

  return (
    <GrowthSeasonDiv>
      <GrowthSeasonItem>
        <GrowthSeasonTitle>성장성</GrowthSeasonTitle>
        <div>{showPotential(keywordSearch.potential)}</div>
      </GrowthSeasonItem>
      <GrowthSeasonItem>
        <GrowthSeasonTitle>계절성</GrowthSeasonTitle>
        <div>{showSeasonal(keywordSearch.seasonal)}</div>
      </GrowthSeasonItem>
    </GrowthSeasonDiv>
  );
}

export default index;
const GrowthSeasonDiv = styled.div`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  width: 37%;
  @media ${(props) => props.theme.mobile} {
    width: 96%;
    padding: 0 0.5em;
    grid-area: a;
    box-shadow: 1px 2px 5px 2px ${(props) => props.theme.colors.lightGray};
  }
`;

const GrowthSeasonItem = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    padding: 0 0.5em;
  }
`;

const GrowthSeasonTitle = styled.div`
  border-bottom: 1px solid;
  font-weight: bold;
  margin-bottom: 1em;
`;
