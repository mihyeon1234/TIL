import React from 'react';
import styled from 'styled-components';
import replaceParam from 'components/keyword';
import {
  SaveButtonHead,
  RecentKeyword,
  RecentCompete,
  RecentSearchAmount,
  RecentProductAmount,
  DeleteButton,
} from '../style';

export function searchClickEvent(keyword) {
  window.open(`/keyword?keyword=${replaceParam(keyword)}&tab=1`);

  if (document.getElementById('searchIcon'))
    document.getElementById('searchIcon').click();
}

export function ListHeader() {
  return (
    <StyledListHeader>
      <SaveButtonHead className="hidden">저장</SaveButtonHead>
      <RecentKeyword>키워드</RecentKeyword>
      <RecentCompete className="hidden">경쟁률</RecentCompete>
      <RecentSearchAmount>검색수</RecentSearchAmount>
      <RecentProductAmount>상품수</RecentProductAmount>
      <DeleteButton />
    </StyledListHeader>
  );
}

const StyledListHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85em;
  color: ${(props) => props.theme.colors.darkGray};
  margin: 0 1.4em;
  @media ${(props) => props.theme.mobile} {
    padding: 0;
  }
`;
