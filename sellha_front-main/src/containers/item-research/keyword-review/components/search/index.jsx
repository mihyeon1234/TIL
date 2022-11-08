import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { getProject } from 'http-api';
import {
  failData,
  fetchData,
  successTeamData,
  successUserData,
} from '../../reducer';

export default function index() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { teamId } = useSelector((state) => state.user);

  const [searchHistory, setSearchHistory] = useState([]);
  const [search, setSearch] = useState('');

  function removeHistory(history) {
    setSearchHistory((prev) => {
      const searchIndex = prev.findIndex((elem) => elem === history);

      if (searchIndex !== -1) {
        prev.splice(searchIndex, 1);
      }

      localStorage.setItem('keywordReviewHistory', JSON.stringify(prev));

      return [...prev];
    });
  }
  const searchProject = useCallback(async (history) => {
    setSearchHistory((prev) => {
      const searchIndex = prev.findIndex((elem) => elem === history);

      if (searchIndex !== -1) {
        prev.splice(searchIndex, 1);
      }
      if (history !== '') {
        const next = [history, ...prev].slice(0, 7);
        localStorage.setItem('keywordReviewHistory', JSON.stringify(next));
        return next;
      }
      return prev;
    });
    dispatch(fetchData());

    try {
      const resTeamProject = await getProject(teamId, history);
      const resUserProject = await getProject(null, history);

      dispatch(successTeamData(resTeamProject));
      dispatch(successUserData(resUserProject));
    } catch (err) {
      dispatch(failData());
    }
  }, []);

  function clickHistory(history) {
    setSearch(history);
    searchProject(history);
  }

  useEffect(() => {
    let localSearchHistory = JSON.parse(
      localStorage.getItem('keywordReviewHistory'),
    );
    localSearchHistory = Array(...new Set(localSearchHistory));

    if (Array.isArray(localSearchHistory)) {
      setSearchHistory(localSearchHistory);
    }

    if (location.state && location.state.keyword) {
      setSearch(location.state.keyword);
      searchProject(location.state.keyword);
    }
  }, []);

  return (
    <Container>
      <TitleDiv>
        <STitle>키워드 리뷰&nbsp;</STitle>
        <SQuestionCircleOutlined data-tip data-for="tooltip-keyword-project" />
        <ReactTooltip id="tooltip-keyword-project" place="right" effect="solid">
          등록된 팀 / 개인이 올린 프로젝트 결과 및 내용을 공유할수 있습니다.
        </ReactTooltip>
      </TitleDiv>

      <SearchDiv>
        <STitle>내역 검색</STitle>
        <SearchHistory>
          <SearchBar>
            <SInput
              placeholder="키워드, 담당자, 내용으로 검색이 가능합니다."
              suffix={
                <SearchOutlined
                  onClick={() => {
                    searchProject(search.trim());
                  }}
                />
              }
              value={search}
              onPressEnter={() => {
                searchProject(search.trim());
              }}
              onChange={(e) => {
                if (e.target.value === '') {
                  searchProject('');
                }
                setSearch(e.target.value.replace(/(^\s*)|(\s*$)/, ''));
              }}
            />
          </SearchBar>
          <HistoryTag>
            {Array.isArray(searchHistory) &&
              searchHistory.map((history) => (
                <Tags
                  key={history}
                  closable
                  onClick={() => clickHistory(history)}
                  onClose={() => removeHistory(history)}
                >
                  {history}
                </Tags>
              ))}
          </HistoryTag>
        </SearchHistory>
      </SearchDiv>
    </Container>
  );
}

const Container = styled.div``;

const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1em;
`;
const STitle = styled.div`
  font-size: 15px;
  font-weight: 600;

  @media ${(props) => props.theme.mobile} {
    font-size: 13px;
    width: 30%;
  }
`;
const SQuestionCircleOutlined = styled(QuestionCircleOutlined)`
  color: #646464;
  font-size: 15px;
  cursor: pointer;
  margin-top: 5px;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;
const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 20px;
  box-shadow: 0 3px 5px lightgray;
  padding: 2em;
  margin-bottom: 1em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding: 1em;
    padding-left: 2em;
  }
`;
const SearchHistory = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-left: 2em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-left: 0em;
  }
`;

const HistoryTag = styled.div`
  margin-top: 5px;
`;

const Tags = styled(Tag)`
  padding: 0 3px;
  margin-right: 5px;
  background: #fff;
  width: fit-content;
  border: 1px solid #ebebeb;
  font-size: 11px;
  cursor: pointer;
  :hover {
    background: lightgray;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  @media ${(props) => props.theme.mobile} {
    width: 90%;
    margin-bottom: 1em;
    margin: auto;
  }
`;

const SInput = styled(Input)`
  border: none;
  border-bottom: 2px solid black;
  padding: 0 0 5px 0;
  box-shadow: none;
  border-radius: none;
  &:hover {
    border: none;
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }
  &:focus {
    border: none;
    box-shadow: none;
    border-bottom: 2px solid black;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-right: 1em;
    margin-left: -1em;
  }
`;
