import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button } from 'antd';
import Swal from 'sweetalert2';

import { setSynonymKeyword } from 'containers/marketing-tools/product-name/reducer';
import { LoadingOutlined } from '@ant-design/icons';
import List from './List';
import { RecentSearchHistory } from '../../components/RecentSearchHistory';

const useInput = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const onProcessKeyword = (regValue) => {
    if (regValue !== ',') {
      setKeyword(regValue);
    }
    if (regValue.includes(',')) {
      regValue
        .split(',')
        .forEach((splitKeyword) =>
          dispatch(setSynonymKeyword(splitKeyword.trim())),
        );
      if (regValue.substr(regValue.length - 1, 1) === ',') {
        setKeyword('');
      } else {
        setTimeout(() => setKeyword(''), 250);
      }
    }
  };

  const handleChange = ({ target: { value } }) => {
    const regValue = value.replace(/ /g, ',');
    onProcessKeyword(regValue);

    setIsHistoryVisible(false);
  };

  const handleEnter = ({ code, target: { value } }) => {
    if (code === 'Comma' || code === 'Enter') {
      if (value.includes(',')) {
        onProcessKeyword(value);
      } else {
        dispatch(setSynonymKeyword(value.trim()));
      }
      if (code === 'Enter') {
        setKeyword('');
      }
    }
  };

  const handleButton = () => {
    const regValue = keyword.replace(/ /g, ',');
    if (regValue.includes(',')) {
      onProcessKeyword(regValue);
    } else {
      dispatch(setSynonymKeyword(keyword));
      setTimeout(() => setKeyword(''), 250);
    }
  };

  const handleOnClickInput = () => {
    setIsHistoryVisible(
      localStorage.getItem('synoKeyword') ? !isHistoryVisible : false,
    );
  };

  return {
    keyword,
    setKeyword,
    onChange: handleChange,
    onPressEnter: handleEnter,
    onClick: handleButton,
    onClickInput: handleOnClickInput,
    isHistoryVisible,
    setIsHistoryVisible,
  };
};

const Search = ({
  loading,
  getSynonymResult,
  synoKeywordHistory,
  setSynoKeywordHistory,
}) => {
  const { synoKeywords } = useSelector((state) => state.productNaming);

  const ref = useRef();

  const {
    keyword,
    setKeyword,
    onChange,
    onPressEnter,
    onClick,
    onClickInput,
    isHistoryVisible,
    setIsHistoryVisible,
  } = useInput();

  const checkInputs = () => {
    if (!synoKeywords) return false;
    if (synoKeywords.length === 0) {
      Swal.fire({
        text: '🚨 키워드를 1개 이상 입력하세요',
        showConfirmButton: false,
        timer: 1500,
        width: 400,
      });
      return false;
    }
    if (synoKeywords.length > 10) {
      Swal.fire({
        text: '🚨 키워드는 최대 10개까지 추가할 수 있습니다.',
        showConfirmButton: false,
        timer: 1500,
        width: 500,
      });
      return false;
    }
    return true;
  };

  return (
    <Container>
      <InputDiv>
        <RefWrapper ref={ref} id="synoKeyword">
          <InputWrapper>
            <SearchInput
              type="text"
              disabled={loading}
              placeholder="키워드를 콤마(,)나 엔터로 구분하여 최대 10개까지 입력할 수 있습니다."
              value={keyword}
              onChange={onChange}
              onKeyPress={onPressEnter}
              autoComplete="off"
              onClick={onClickInput}
            />
            <AddButton onClick={onClick}>추가</AddButton>
          </InputWrapper>
          {localStorage.getItem('synoKeyword') && isHistoryVisible && (
            <RecentSearchHistory
              keywordArray={synoKeywordHistory}
              modalRef={ref}
              setIsHistoryVisible={setIsHistoryVisible}
              inputs={keyword}
              setInputs={setKeyword}
              setKeywordHistory={setSynoKeywordHistory}
            />
          )}
        </RefWrapper>
      </InputDiv>

      {synoKeywords.length > 0 && <List />}

      <ButtonDiv>
        <SubmitButton
          onClick={() => checkInputs() && getSynonymResult(synoKeywords)}
        >
          {loading ? <Loading /> : <span>분석하기</span>}
        </SubmitButton>
      </ButtonDiv>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  margin: auto 0;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;
const RefWrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  font-size: 0.8rem;
  padding: 8px 10px;
  border-radius: 0.5rem;
  margin: 0.25rem 0;
  width: 100%;
`;

const AddButton = styled(Button)`
  width: 60px;
  height: fit-content;
  padding: 0.5em 0;
  margin: auto 0 auto 0.5em;
  border-radius: 5px;
  border: 1px solid #ffda4f;
  color: #ffda4f;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const SubmitButton = styled(Button)`
  width: 7rem;
  height: 2.3rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.white};
  border: none;
  :hover {
    background-color: #ffdd63;
    transition: all 0.3s ease-in-out;
    color: ${(props) => props.theme.colors.white};
  }
  :focus {
    background-color: ${(props) => props.theme.colors.orange};
    color: ${(props) => props.theme.colors.white};
  }
`;

const Loading = styled(LoadingOutlined)`
  font-size: 0.8rem;
`;
