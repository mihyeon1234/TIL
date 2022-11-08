import React, { useEffect } from 'react';
import styled from 'styled-components';

const setArrayData = (history, keywords, setKeywords, type) => {
  if (keywords.length !== 0) {
    const array = [];

    array.unshift(keywords);

    if (history) {
      history.forEach((value) => {
        // 배열 내 중복 데이터 제거
        if (keywords.toString().trim() !== value.toString()) {
          array.push(value);
        }
      });
    }

    if (array.length === 6) array.pop();

    setKeywords(array);
    localStorage.setItem(type, JSON.stringify(array));
  } else {
    alert('키워드를 입력해주세요.');
  }
};

const RecentSearchHistory = ({
  keywordArray,
  modalRef,
  setIsHistoryVisible,
  inputs,
  setInputs,
  setKeywordHistory,
}) => {
  const refId = modalRef.current.id;

  const handleClickOutSide = ({ target }) => {
    if (!modalRef.current.contains(target)) {
      setIsHistoryVisible(false);
    }
  };

  const onClickRemoveButton = () => {
    localStorage.removeItem(refId);
    setKeywordHistory('');
    setIsHistoryVisible(false);
  };

  const onClickHandle = (keywords) => {
    if (refId === 'synoKeyword') {
      if (Array.isArray(keywords)) {
        setInputs(keywords.join());
      } else setInputs(keywords);
    } else {
      setInputs({ ...inputs, [refId]: keywords });
    }
    setIsHistoryVisible(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => document.removeEventListener('mousedown', handleClickOutSide);
  });

  return (
    <Container>
      <ButtonWrapper>
        <Title>최근 검색어</Title>
        <RemoveButton onClick={() => onClickRemoveButton()}>
          전체 삭제
        </RemoveButton>
      </ButtonWrapper>
      <HistoryWrapper>
        {keywordArray &&
          keywordArray.map((keywords) => (
            <KeywordWrapper
              key={keywords}
              onClick={() => onClickHandle(keywords)}
            >
              {refId === 'mainKeyword' ? keywords : keywords.join(', ')}
            </KeywordWrapper>
          ))}
      </HistoryWrapper>
    </Container>
  );
};

export { RecentSearchHistory, setArrayData };

const Container = styled.div`
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  font-size: 0.8rem;
  border-radius: 0.5rem;
  padding: 10px 0;

  z-index: 99;
`;
const ButtonWrapper = styled.div`
  margin-bottom: 5px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`;
const HistoryWrapper = styled.div``;
const KeywordWrapper = styled.div`
  padding: 5px 10px;
  width: 100%;
  cursor: pointer;

  :hover {
    background-color: #fffbeb;
  }
`;
const Title = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.darkGray};
`;
const RemoveButton = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.darkGray};
  text-decoration: underline;
  cursor: pointer;

  :hover {
    font-weight: 600;
  }
`;
