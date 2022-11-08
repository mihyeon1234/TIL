import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Button } from 'antd';

import { addKeywordList } from '../../reducer';

const Input = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  const onChangeInput = ({ target: { value } }) => {
    if (value !== ',') {
      setKeyword(value);
    }
    if (value.includes(',')) {
      value
        .split(',')
        .forEach((splitKeyword) =>
          dispatch(addKeywordList(splitKeyword.trim())),
        );
      if (value.substr(value.length - 1, 1) === ',') {
        setKeyword('');
      } else {
        setTimeout(() => setKeyword(''), 250);
      }
    }
  };

  const onKeyPressInput = ({ code, target: { value } }) => {
    if (code === 'Comma' || code === 'Enter') {
      dispatch(addKeywordList(value.trim()));
      if (code === 'Enter') {
        setKeyword('');
      }
    }
  };

  const onClickAddButton = () => {
    dispatch(addKeywordList(keyword));
    setTimeout(() => setKeyword(''), 250);
  };

  return (
    <InputWrapper>
      <InputBox
        type="text"
        placeholder="키워드를 콤마(,)나 엔터로 구분하여 입력하세요."
        value={keyword}
        onChange={onChangeInput}
        onKeyPress={onKeyPressInput}
      />
      <AddButton onClick={onClickAddButton}>담기</AddButton>
    </InputWrapper>
  );
};
export default Input;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputBox = styled.input`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  font-size: 0.8rem;
  padding: 8px 10px;
  margin-right: 0.8rem;
  border-radius: 0.25rem;
`;

const AddButton = styled(Button)`
  width: 4rem;
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
