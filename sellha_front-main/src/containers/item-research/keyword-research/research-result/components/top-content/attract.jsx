import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

function index() {
  const keywordSearch = useSelector((state) => state.keywordSearch);

  return (
    <AttractDiv>
      <AttractTitle>매력도</AttractTitle>
      <StarRatings
        name="rating"
        rating={keywordSearch.attract}
        numberOfStars={5}
        starRatedColor="#FFDA4F"
        starDimension="14px"
        starSpacing="-5px"
      />
      <AttractNumberDiv>
        <AttractNumber>{keywordSearch.attract}</AttractNumber>
        <FixNumber> / 5</FixNumber>
      </AttractNumberDiv>
    </AttractDiv>
  );
}

export default index;

const AttractDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  box-shadow: 1px 2px 5px 2px ${(props) => props.theme.colors.lightGray};
  border-radius: 1em;
  margin-left: 0.5em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 30px 0 0 0;
    padding: 1.2em 0;
    flex-direction: row;
    justify-content: space-evenly;
    /* box-shadow: none; */
    border: 1px solid #eee;
  }
`;

const AttractTitle = styled.div`
  font-size: 1em;
  font-weight: 600;
  cursor: default;
  background: linear-gradient(to top, rgb(255, 222, 135) 25%, transparent 30%);
  margin-bottom: 0.75em;
`;

const AttractNumberDiv = styled.div`
  display: flex;
  font-size: 1em;
`;

const AttractNumber = styled.div`
  font-weight: 600;
  @media ${(props) => props.theme.mobile} {
    font-size: 1em;
  }
`;
const FixNumber = styled.div`
  margin-left: 0.3em;
  color: ${(props) => props.theme.colors.gray};
`;
