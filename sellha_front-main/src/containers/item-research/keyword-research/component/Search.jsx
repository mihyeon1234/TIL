import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Input } from 'antd';
import {
  SearchOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import replaceParam from 'components/keyword';

function index({ searchKeyword }) {
  const history = useHistory();
  const keywordSearch = useSelector((state) => state.keywordSearch);
  // input
  const searchInput = useRef();
  // input의 value
  const [value, setValue] = useState();

  useEffect(() => {
    if (searchInput.current) {
      // input에 포커스
      searchInput.current.focus();
    }

    if (searchKeyword) {
      const keyword = searchKeyword.trim();
      if (keyword !== null) {
        setValue(keyword);
      }
    } else {
      setValue('');
    }

    return () => {
      setValue('');
    };
  }, [searchKeyword]);

  // 검색
  function searchEvent() {
    if (value && value.trim().length > 0) {
      const searchValue = value?.trim();
      if (searchValue && searchValue.length > 0) {
        history.push(`/keyword?keyword=${replaceParam(searchValue)}&tab=1`);
      }
    }
  }

  return (
    <TitleDiv>
      <Content>
        {keywordSearch.success ? (
          <LeftArrowIcon
            onClick={() => {
              history.push('/keyword');
            }}
          />
        ) : (
          <div style={{ width: '1.75rem' }} />
        )}
        <STitle className="hidden">
          키워드 검색
          <QuestionCircleIcon data-tip data-for="tooltip-search" />
        </STitle>
        <ReactTooltip
          id="tooltip-search"
          place="right"
          effect="solid"
          className="hidden"
        >
          구매자에게 상품을 보여주는 검색어로 검색 키워드의 세부 정보들이
          제공됩니다.
        </ReactTooltip>
        <SearchDiv>
          <SInput
            disabled={keywordSearch.loading}
            ref={searchInput}
            allowClear
            placeholder="키워드를 입력하세요"
            value={value}
            suffix={
              <SearchOutlined
                id="searchIcon"
                onClick={() => {
                  searchEvent();
                }}
              />
            }
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onPressEnter={() => {
              searchEvent();
            }}
          />
        </SearchDiv>
      </Content>
    </TitleDiv>
  );
}

export default index;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1.8em 2.5em;
  border-radius: 1.5em;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray}; // 0 5px 5px lightgray;

  @media ${(props) => props.theme.mobile} {
    border: none;
    box-shadow: none;
    padding: 0em 2em;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

const LeftArrowIcon = styled(LeftOutlined)`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray};
  margin-right: 0.35rem;
  :hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const STitle = styled.div`
  width: 7.5em;
  font-size: 1.1em;
  font-weight: 600;

  @media ${(props) => props.theme.mobile} {
    font-size: 13px;
    width: 30%;
  }
`;

const QuestionCircleIcon = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  margin-left: 2em;
  font-size: 0.9em;
  @media ${(props) => props.theme.mobile} {
    flex: none;
    width: 90%;
    margin: 0em 2em 2em;
  }
`;
const SInput = styled(Input)`
  max-width: 400px;
  padding: 0;
  border: none;
  border-bottom: 2px solid black;
  border-radius: none;

  box-shadow: none;

  > input {
    text-indent: 0.5em;
  }

  &:hover {
    border: none;
    box-shadow: none;
    border-bottom: 2px solid black;
  }
  &:focus {
    border: none;
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }

  #searchIcon {
    height: 2em;
    width: 2em;
    padding: 0.5em;

    &:hover {
      color: ${(props) => props.theme.colors.gray};
    }
  }

  .ant-input-suffix > *:not(:last-child) {
    margin: unset;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-right: 1em;
    margin-left: -1em;
  }
`;
