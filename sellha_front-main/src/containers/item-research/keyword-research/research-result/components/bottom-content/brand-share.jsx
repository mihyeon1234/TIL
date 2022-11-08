import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function index() {
  const keywordSearch = useSelector((state) => state.keywordSearch);

  return (
    <BrandShareDiv>
      <BrandShareItem>
        <BrandShareTitle>브랜드 점유율</BrandShareTitle>
        <div>
          {(keywordSearch.brandShare * 100).toFixed(1).toLocaleString()}%
        </div>
      </BrandShareItem>
    </BrandShareDiv>
  );
}

export default index;

const BrandShareDiv = styled.div`
  border: 1.5px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 1em;
  display: flex;
  margin-left: 0.8em;
  width: 21.7%;
  @media ${(props) => props.theme.mobile} {
    margin: 0;
    width: 100%;
    grid-area: c;
    box-shadow: 1px 2px 5px 2px ${(props) => props.theme.colors.lightGray};
  }
`;

const BrandShareItem = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    width: 120px;
    height: 100px;
    margin: 0 auto;
  }
`;

const BrandShareTitle = styled.div`
  border-bottom: 1px solid;
  font-weight: bold;
  margin-bottom: 1em;
`;
