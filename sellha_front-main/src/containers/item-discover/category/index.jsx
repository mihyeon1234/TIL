/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { AutoComplete, Button, Select } from 'antd';
import {
  QuestionCircleOutlined,
  RetweetOutlined,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { TiArrowSortedDown } from 'react-icons/ti';
import { getCategoryBySearch, getChildsById } from 'http-api';
import {
  inputCategory,
  searchCategory,
  selectCategory,
  setCategory,
  toggleSearchMode,
} from './reducer';
import { unsetFilter as keywordUnsetFilter } from '../popular/keyword/reducer';
import { unsetFilter as categoryUnsetFilter } from '../popular/category/reducer';

function index() {
  const dispatch = useDispatch();
  const discover = useSelector((state) => state.discover);
  const keywordChart = useSelector((state) => state.keywordChart);
  const categorySub = useSelector((state) => state.categorySub);

  const {
    select,
    searchMode,
    searchResults,
    searchName,
    category1List,
    category2List,
    category3List,
    category4List,
  } = discover;

  useEffect(() => {
    const asyncCategory = async () => {
      const data = await getChildsById(
        select.id !== 'all' ? select.id : undefined,
      );

      if (data) {
        const { level, categories } = data;
        dispatch(setCategory(level + 1, categories));
      }
    };
    asyncCategory();
  }, [select]);

  const handleAutoSearch = async (search) => {
    try {
      const data = await getCategoryBySearch(search);

      const options = data.map((option) => {
        const newOption = { ...option };
        newOption.value = newOption.fullPath;
        return newOption;
      });
      dispatch(searchCategory(options));
    } catch (error) {
      dispatch(searchCategory([]));
    }
  };

  return (
    <CategoryDiv>
      <CategoryBody>
        <CategoryTitle>
          카테고리
          <QuestionCircleIcon data-tip data-for="tooltip-search" />
        </CategoryTitle>
        <ReactTooltip
          id="tooltip-search"
          className="tooltip-keyword"
          place="top"
          effect="solid"
        >
          카테고리를 선택하시면 해당 선택 카테고리의 키워드의 세부 순위를
          제공합니다.
        </ReactTooltip>
        <CategoryContent>
          <SearchButton
            onClick={() => {
              dispatch(toggleSearchMode());
            }}
          >
            <RetweetOutlined />
          </SearchButton>
          {searchMode && (
            <SAutoComplete
              options={searchResults}
              onSelect={async (value, option) => {
                dispatch(selectCategory(option));
                for (let i = 1, j = option.level + 1; i < j; i += 1) {
                  const { level, categories } = await getChildsById(
                    option[`idLevel${i}`] || option.id,
                  );
                  dispatch(setCategory(level + 1, categories));
                }
              }}
              onSearch={handleAutoSearch}
              onChange={(value) => dispatch(inputCategory(value))}
              value={searchName}
              placeholder="카테고리명을 검색해보세요"
              allowClear
              disabled={keywordChart.loading || categorySub.loading}
            />
          )}

          {!searchMode && (
            <SSelect
              disabled={!category1List.length}
              placeholder="1분류"
              value={
                select.nameLevel1 ||
                (select.level === 1 && select.name) ||
                select.fullPath ||
                null
              }
              onSelect={(value) => {
                if (value >= 0) {
                  dispatch(selectCategory(category1List[value]));
                } else {
                  dispatch(
                    selectCategory({
                      id: 'all',
                      nameLevel1: '전체',
                      fullPath: '전체',
                    }),
                  );
                }
              }}
              suffixIcon={<ArrowIcon />}
              bordered={false}
            >
              <Select.Option key="allCategory" value={-1}>
                전체
              </Select.Option>
              {category1List.map((category, category1Idx) => (
                <Select.Option key={category.id} value={category1Idx}>
                  {category.name}
                </Select.Option>
              ))}
            </SSelect>
          )}

          {!searchMode && (
            <>
              <RightDiv>
                <RightIcon />
              </RightDiv>
              <SSelect
                disabled={!category2List.length}
                key={select.idLevel1}
                placeholder="2분류"
                value={
                  select.nameLevel2 ||
                  (select.level === 2 && select.name) ||
                  null
                }
                onSelect={(value) => {
                  if (value >= 0) {
                    dispatch(selectCategory(category2List[value]));
                  }
                }}
                suffixIcon={<ArrowIcon />}
                bordered={false}
              >
                {category2List.map((category, category2Idx) => (
                  <Select.Option key={category.id} value={category2Idx}>
                    {category.name}
                  </Select.Option>
                ))}
              </SSelect>
            </>
          )}

          {!searchMode && (
            <>
              <RightDiv>
                <RightIcon />
              </RightDiv>
              <SSelect
                disabled={!category3List.length}
                key={select.idLevel2}
                placeholder="3분류"
                value={
                  select.nameLevel3 ||
                  (select.level === 3 && select.name) ||
                  null
                }
                onSelect={(value) => {
                  if (value >= 0) {
                    dispatch(selectCategory(category3List[value]));
                  }
                }}
                suffixIcon={<ArrowIcon />}
                bordered={false}
              >
                {category3List.map((category, category3Idx) => (
                  <Select.Option key={category.id} value={category3Idx}>
                    {category.name}
                  </Select.Option>
                ))}
              </SSelect>
            </>
          )}

          {!searchMode && (
            <>
              <RightDiv>
                <RightIcon />
              </RightDiv>
              <SSelect
                disabled={!category4List.length}
                key={select.idLevel3}
                placeholder="4분류"
                value={(select.level === 4 && select.name) || null}
                onSelect={(value) => {
                  if (value >= 0) {
                    dispatch(selectCategory(category4List[value]));
                  }
                }}
                suffixIcon={<ArrowIcon />}
                bordered={false}
              >
                {category4List.map((category, category4Idx) => (
                  <Select.Option key={category.id} value={category4Idx}>
                    {category.name}
                  </Select.Option>
                ))}
              </SSelect>
            </>
          )}

          <SearchButton
            disabled={keywordChart.loading || categorySub.loading}
            onClick={() => {
              dispatch(categoryUnsetFilter());
              dispatch(keywordUnsetFilter());
              dispatch({ type: 'CATEGORY_SELECT_COPY' });
            }}
          >
            <SearchOutlined />
          </SearchButton>
        </CategoryContent>
      </CategoryBody>
    </CategoryDiv>
  );
}

export default index;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  @media ${(props) => props.theme.mobile} {
    margin-bottom: 20px;
  }
`;

const CategoryBody = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6.2em;
  border-radius: 1.5em;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray}; // 0 5px 5px lightgray;
  padding: 1.8em 2.5em;

  .ant-btn {
    @media ${(props) => props.theme.mobile} {
      margin: 1.5em 0;
    }
  }

  .ant-select {
    @media ${(props) => props.theme.mobile} {
      margin-top: 0;
      margin-bottom: 0.5em;
    }
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
    border-bottom: 2px solid black;
  }

  @media ${(props) => props.theme.mobile} {
    display: flex;
    flex-direction: column;
    min-height: 14.5em;
    height: 100%;
    align-items: normal;
    padding: 1.2em 0.5em;
    border: none;
    box-shadow: none;
    background-color: #fbfbfb;
    border-radius: 0;
  }
`;

const CategoryTitle = styled.div`
  width: 6.5em;
  font-size: 1.1em;
  font-weight: 600;

  @media ${(props) => props.theme.mobile} {
    margin-left: 1.5em;
  }
`;

const QuestionCircleIcon = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;
`;

const CategoryContent = styled.div`
  display: flex;
  width: 92%;
  height: 2.3em;
  justify-content: space-between;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    width: 100%;
    align-items: center;
    height: fit-content;
  }
`;

const SearchButton = styled(Button)`
  border-radius: 0.4em;
  border-color: ${(props) => props.theme.colors.lightGray};
  @media ${(props) => props.theme.mobile} {
    margin-top: 1em;
  }
`;

const SAutoComplete = styled(AutoComplete)`
  width: 87%;

  @media ${(props) => props.theme.mobile} {
    width: 80%;
  }
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const RightIcon = styled(RightOutlined)`
  color: ${(props) => props.theme.colors.gray};
`;

const SSelect = styled(Select)`
  font-size: 1em;
  line-height: 22px !important;
  max-width: 13em;
  min-width: 9.5em;
  border-bottom: 2px solid black;

  &:hover,
  &:focus {
    border: none;
    box-shadow: none;
    border-bottom: 2px solid black;
  }

  @media ${(props) => props.theme.mobile} {
    width: 80%;
    margin-left: 0;
    margin-right: 0;
    margin-top: 10px;
  }
`;

const ArrowIcon = styled(TiArrowSortedDown)`
  color: ${(props) => props.theme.colors.black};
`;
