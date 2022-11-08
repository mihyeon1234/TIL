import React, { useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button } from 'antd';
import Swal from 'sweetalert2';

import { setCombinationKeyword } from 'containers/marketing-tools/product-name/reducer';
import { LoadingOutlined } from '@ant-design/icons';

import {
  RecentSearchHistory,
  setArrayData,
} from '../../components/RecentSearchHistory';

const useInput = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    mainKeyword: '',
    subKeyword: [],
  });
  const [isSubHistoryVisible, setIsSubHistoryVisible] = useState(false);
  const [isMainHistoryVisible, setIsMainHistoryVisible] = useState(false);

  const [subKeywordHistory, setSubKeywordHistory] = useState(
    JSON.parse(localStorage.getItem('subKeyword')),
  );
  const [mainKeywordHistory, setMainKeywordHistory] = useState(
    JSON.parse(localStorage.getItem('mainKeyword')),
  );

  const handleChange = useCallback(
    (e) => {
      const { value, name } = e.target;

      if (name === 'subKeyword') setIsSubHistoryVisible(false);

      if (name === 'mainKeyword') setIsMainHistoryVisible(false);

      setInputs({
        ...inputs,
        [name]:
          name === 'subKeyword' ? value.replace(/ /g, ',').split(',') : value,
      });
    },
    [inputs],
  );

  const checkInputs = () => {
    if (!inputs) return false;
    if (inputs.subKeyword.length === 0 || inputs.subKeyword.includes('')) {
      Swal.fire({
        text: '🚨 세부 키워드를 입력하세요',
        showConfirmButton: false,
        timer: 1500,
        width: 300,
      });
      return false;
    }
    if (inputs.mainKeyword === '' || inputs.mainKeyword.trim().length === 0) {
      Swal.fire({
        text: '🚨 메인 키워드를 입력하세요',
        showConfirmButton: false,
        timer: 1500,
        width: 300,
      });
      return false;
    }
    if (inputs.subKeyword.length > 10) {
      Swal.fire({
        text: '🚨 세부 키워드는 10개 이하로 입력할 수 있습니다.',
        showConfirmButton: false,
        timer: 1500,
        width: 500,
      });
      return false;
    }
    return true;
  };

  const handleEnter = ({ code }) => {
    if (!code || code === 'Enter') {
      if (checkInputs()) {
        handleKewordHistory(inputs);
        dispatch(setCombinationKeyword(inputs));
        setIsSubHistoryVisible(false);
        setIsMainHistoryVisible(false);
      }
    }
  };

  const handleOnclick = (e) => {
    const target = e.target.name;
    if (target === 'subKeyword') {
      setIsSubHistoryVisible(!isSubHistoryVisible);
    } else setIsMainHistoryVisible(!isMainHistoryVisible);
  };

  const handleKewordHistory = (data) => {
    setArrayData(
      subKeywordHistory,
      data.subKeyword,
      setSubKeywordHistory,
      'subKeyword',
    );
    setArrayData(
      mainKeywordHistory,
      data.mainKeyword,
      setMainKeywordHistory,
      'mainKeyword',
    );
  };

  return {
    inputs,
    setInputs,
    onChange: handleChange,
    onPressEnter: handleEnter,
    onClick: handleOnclick,
    subKeywordHistory,
    setSubKeywordHistory,
    mainKeywordHistory,
    setMainKeywordHistory,
    isSubHistoryVisible,
    setIsSubHistoryVisible,
    isMainHistoryVisible,
    setIsMainHistoryVisible,
  };
};

const Search = ({ loading }) => {
  const { combiResult } = useSelector((state) => state.productNaming);

  const subRef = useRef();
  const mainRef = useRef();

  const {
    inputs: { mainKeyword, subKeyword },
    setInputs,
    onChange,
    onPressEnter,
    onClick,
    subKeywordHistory,
    setSubKeywordHistory,
    mainKeywordHistory,
    setMainKeywordHistory,
    isSubHistoryVisible,
    setIsSubHistoryVisible,
    isMainHistoryVisible,
    setIsMainHistoryVisible,
  } = useInput();

  return (
    <Container loading={combiResult.length === 0 ? 'true' : 'false'}>
      <InputDiv>
        <InputWrapper ref={subRef} id="subKeyword">
          <InputBox
            type="text"
            disabled={loading}
            placeholder="세부 키워드를 입력해주세요. 예) 소, 닭, 돼지"
            name="subKeyword"
            value={subKeyword}
            onChange={onChange}
            onKeyPress={onPressEnter}
            onClick={onClick}
            autoComplete="off"
          />
          {localStorage.getItem('subKeyword') && isSubHistoryVisible && (
            <RecentSearchHistory
              keywordArray={subKeywordHistory}
              modalRef={subRef}
              setIsHistoryVisible={setIsSubHistoryVisible}
              inputs={{ mainKeyword, subKeyword }}
              setInputs={setInputs}
              setKeywordHistory={setSubKeywordHistory}
            />
          )}
        </InputWrapper>

        <InputWrapper ref={mainRef} id="mainKeyword">
          <InputBox
            type="text"
            disabled={loading}
            placeholder="메인 키워드를 입력하세요. 예) 고기"
            name="mainKeyword"
            value={mainKeyword}
            onChange={onChange}
            onKeyPress={onPressEnter}
            onClick={onClick}
            autoComplete="off"
          />
          {localStorage.getItem('mainKeyword') && isMainHistoryVisible && (
            <RecentSearchHistory
              keywordArray={mainKeywordHistory}
              modalRef={mainRef}
              setIsHistoryVisible={setIsMainHistoryVisible}
              inputs={{ mainKeyword, subKeyword }}
              setInputs={setInputs}
              setKeywordHistory={setMainKeywordHistory}
            />
          )}
        </InputWrapper>
      </InputDiv>
      <ButtonDiv>
        <SubmitButton onClick={onPressEnter}>
          {loading ? <Loading /> : <span>분석하기</span>}
        </SubmitButton>
      </ButtonDiv>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  margin: auto 0;
  transform: ${({ loading }) =>
    loading === 'true' ? 'translate(0, -5px)' : 'translate(0,5px)'};
  transition: transform 800ms cubic-bezier(0.3, 0, 0.2, 1);

  z-index: 999;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;
const InputWrapper = styled.div`
  position: relative;
`;

const InputBox = styled.input`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  font-size: 0.8rem;
  padding: 8px 10px;
  border-radius: 0.5rem;
  margin: 0.25rem 0;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
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
