import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

import { getRelatedData } from 'http-api';
import {
  failRelatedData,
  fetchRelatedData,
  setCategoryData,
  setRelatedData,
} from 'containers/item-research/keyword-research/related-keyword/reducer';
import RecommendTable from '../../../item-research/keyword-research/related-keyword/components/Table';
import RecommendCategory from '../../../item-research/keyword-research/related-keyword/components/Category';
import { setMemoKeyword, setSelectKeyword } from '../reducer';

const useInput = () => {
  const [inputValue, setInputValue] = useState();
  const [keyword, setKeyword] = useState('');

  const handleChange = useCallback(
    (e) => {
      setInputValue(e.target.value);
    },
    [inputValue],
  );

  const handleEnter = () => {
    setKeyword(inputValue);
  };

  return {
    inputValue,
    keyword,
    onChange: handleChange,
    onPressEnter: handleEnter,
  };
};

export default function index() {
  const dispatch = useDispatch();
  const { selectKeywords } = useSelector((state) => state.productNaming);
  const { loading, category, relatedData } = useSelector(
    (state) => state.relatedKeyword,
  );

  const { inputValue, keyword, onPressEnter, onChange } = useInput();

  const getRelatedKeyword = async () => {
    dispatch(fetchRelatedData());
    try {
      const { bestCategory, list } = await getRelatedData(keyword);
      dispatch(setRelatedData(list));
      dispatch(setCategoryData(bestCategory));
    } catch (error) {
      Swal.fire({
        text: '데이터가 없습니다.',
        confirmButtonText: `확인`,
        confirmButtonColor: '#FFC83A',
        allowEnterKey: false,
      });
      dispatch(failRelatedData());
    }
  };

  useEffect(() => {
    if (keyword) getRelatedKeyword();

    return () => {
      dispatch(failRelatedData());
    };
  }, [keyword]);

  const rowSelection = {
    columnTitle: <CStitle>선택</CStitle>,
    columnWidth: 80,
    selectedRowKeys: selectKeywords.map(({ relKeyword }) => relKeyword),
    preserveSelectedRowKeys: true,
    onChange: (rowKeys, selectedRows) => {
      const selectedRow = selectedRows.map((row) => ({
        relKeyword: row.relKeyword,
        searchAmount: row.searchAmount,
      }));
      dispatch(setSelectKeyword(selectedRow));
    },
    onSelect: (record) => {
      dispatch(setMemoKeyword(record.relKeyword));
    },
  };

  return (
    <Container>
      <TopDiv>
        <InputBox
          allowClear
          disabled={loading}
          placeholder="키워드를 입력하세요"
          value={inputValue}
          onChange={onChange}
          onPressEnter={onPressEnter}
          suffix={<SearchOutlined onClick={onPressEnter} />}
        />
      </TopDiv>
      <CategoryDiv>
        {category.length > 0 && (
          <CategoryBox>
            <CategoryText>추천 카테고리</CategoryText>
            <RecommendCategory />
          </CategoryBox>
        )}
      </CategoryDiv>
      <SerchTitle id="result">검색 결과 {relatedData?.length}개</SerchTitle>
      <RecommendTable rowSelection={rowSelection} keyword={keyword} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CStitle = styled.div`
  font-weight: 700;
  text-align: center;
  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;

const SerchTitle = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.8rem;
`;

const InputBox = styled(Input)`
  max-width: 400px;
  height: 40px;
`;

const CategoryDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1.5rem;
`;

const CategoryBox = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 5px 20px;
  border-radius: 15px;
`;

const CategoryText = styled.span`
  font-size: 1em;
  font-weight: 600;
`;
