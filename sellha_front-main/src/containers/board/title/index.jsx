/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import styled from 'styled-components';
import { getForum } from '../api';

function searchNoticeData(searchText, setNoticeData, setSelectId) {
  async function getTableData() {
    setSelectId('');

    const result = await getForum({
      search: searchText,
    });
    setNoticeData(result);

    if (result.length > 0) {
      // 열려있는 게시글 전체 삭제
      const listLength = document.getElementsByClassName('noticeOpen').length;
      for (let i = 0; i < listLength; i++) {
        document.getElementsByClassName('noticeOpen')[0].remove();
      }
    }
  }

  getTableData();
}

function Index({ setNoticeData, setSelectId }) {
  const [search, setSearch] = useState();

  return (
    <Container>
      <ContentTitle>게시판</ContentTitle>
      <SearchView>
        <SearchInput
          id="search"
          type="text"
          placeholder="제목이나 내용을 검색하세요"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchNoticeData(e.target.value, setNoticeData, setSelectId);
            }
          }}
        />
        <SearchButton
          onClick={() => searchNoticeData(search, setNoticeData, setSelectId)}
        >
          <span>검색</span>
        </SearchButton>
      </SearchView>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
`;

const ContentTitle = styled.span`
  font-size: 1.1em;
  font-weight: 600;
  @media ${(props) => props.theme.mobile} {
    font-size: 20px;
  }
`;

const SearchView = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 35px; */
  width: 25%;
  min-width: 220px;
`;

const SearchInput = styled.input`
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
  margin-right: 0.8em;
  font-size: 0.85rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const SearchButton = styled.button`
  width: 4rem;
  height: 3em;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray};
  color: ${(props) => props.theme.colors.gray};
  border-radius: 1em;
  font-size: 0.9em;
  &:hover,
  &:focus,
  &:active {
    font-weight: 600;
    color: ${(props) => props.theme.colors.gray};
    background: none;
  }
`;
